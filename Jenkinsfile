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
                }
                checkout scm
            }
        }

        stage('Prepare Docker volume') {
            steps {
                script {
                    bat(returnStatus: true, script: 'docker volume rm ezoo_node_modules')
                }
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    def exitCode = bat(returnStatus: true, script: '''
                        docker run --rm -u root -e CI=true --env-file "%WORKSPACE%\\.env" -v "%WORKSPACE%:/work" -v "%WORKSPACE%\\allure-results:/work/allure-results" -v "%WORKSPACE%\\allure-report:/work/allure-report" -v ezoo_node_modules:/work/node_modules -v ezoo_pw_browsers:/root/.cache/ms-playwright -w /work %DOCKER_IMAGE% bash -lc "npm ci && npx playwright install --with-deps && npx playwright test" ''')
                    
                    if (exitCode != 0) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                allure([
                    includeProperties: false,
                    jdk: 'Allure',
                    results: [[path: 'allure-results']],
                    reportBuildPolicy: 'ALWAYS'
                ])
                archiveArtifacts artifacts: 'test-results/**/*trace.zip', allowEmptyArchive: true
            }
        }
    }
}