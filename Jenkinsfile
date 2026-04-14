pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_IMAGE = 'node:18'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ArtsiukhoyskayaMargo/EZOO.git'
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
                        docker run --rm ^
                          -u root ^
                          -e CI=true ^
                          --env-file "%WORKSPACE%\\.env" ^
                          -v "%WORKSPACE%:/work" ^
                          -v ezoo_node_modules:/work/node_modules ^
                          -v ezoo_pw_browsers:/root/.cache/ms-playwright ^
                          -w /work ^
                          %DOCKER_IMAGE% ^
                          bash -lc "node -v && npm -v && npm ci && npx playwright install --with-deps && npx playwright test"
                    ''')

                    if (exitCode != 0) {
                        currentBuild.result = 'FAILURE'
                        error("Tests failed (exit code: ${exitCode})")
                    }
                }
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: 'Allure',
                results: [[path: 'allure-results']]
            ])
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
        }
    }
}