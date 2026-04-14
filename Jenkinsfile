pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_IMAGE = 'node:18-slim'  
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

        stage('Docker Info') {
            steps {
                bat '''
                    docker version
                    docker pull %DOCKER_IMAGE%
                '''
            }
        }

        stage('Install Dependencies and Run Tests in Docker') {
            steps {
                script {
                    bat(returnStatus: true, script: '''
                        docker run --rm ^
                          -u root ^
                          -e CI=true ^
                          --env-file "%WORKSPACE%\\.env" ^
                          -v "%WORKSPACE%:/work" ^
                          -v ezoo_node_modules:/work/node_modules ^
                          -w /work ^
                          %DOCKER_IMAGE% ^
                          bash -lc "node -v && npm -v && npm ci && npm install --unsafe-perm && npm install playwright && playwright install && npx playwright test"
                    ''')
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