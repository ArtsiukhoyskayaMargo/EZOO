pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    triggers {
        githubPush()
    }

    environment {
        DOCKER_IMAGE = 'node:20-bookworm'
    }

    stages {
        stage('Checkout & Clean') {
            steps {
                script {
                    bat 'if exist allure-results rd /s /q allure-results'
                    bat 'if exist allure-report rd /s /q allure-report'
                    echo "Workspace cleaned."
                }
                checkout scm
            }
        }

        stage('Prepare Docker volume') {
            when {
                expression { env.GIT_BRANCH?.contains('main') || env.BRANCH_NAME == 'main' || env.GIT_LOCAL_BRANCH == 'main' }
            }
            steps {
                script {
                    bat(returnStatus: true, script: 'docker volume rm ezoo_node_modules')
                }
            }
        }

        stage('Run Tests in Docker') {
            when {
                expression { env.GIT_BRANCH?.contains('main') || env.BRANCH_NAME == 'main' || env.GIT_LOCAL_BRANCH == 'main' }
            }
            steps {
                script {
                    def exitCode = bat(returnStatus: true, script: '''
                        docker run --rm -u root -e CI=true --env-file "%WORKSPACE%\\.env" -v "%WORKSPACE%:/work" -v "%WORKSPACE%\\allure-results:/work/allure-results" -v "%WORKSPACE%\\allure-report:/work/allure-report" -v ezoo_node_modules:/work/node_modules -v ezoo_pw_browsers:/root/.cache/ms-playwright -w /work %DOCKER_IMAGE% bash -lc "npm ci && npx playwright install --with-deps && npx playwright test" ''')
                    
                    if (exitCode != 0) {
                        currentBuild.result = 'FAILURE'
                        echo "Tests failed with exit code: ${exitCode}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('allure-results')) {
                    allure([
                        includeProperties: false,
                        jdk: 'Allure',
                        results: [[path: 'allure-results']],
                        reportBuildPolicy: 'ALWAYS'
                    ])
                    archiveArtifacts artifacts: 'test-results/**/*trace.zip', allowEmptyArchive: true
                } else {
                    echo "WARNING: No allure-results folder found."
                }
            }
        }
    }
}