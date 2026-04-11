pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.58.0-jammy'
    }

    stages {
        stage('Clean workspace') {
            steps {
                bat '''
                    if exist node_modules rmdir /s /q node_modules
                    if exist playwright-report rmdir /s /q playwright-report
                    if exist test-results rmdir /s /q test-results
                    if exist allure-results rmdir /s /q allure-results
                    if exist allure-report rmdir /s /q allure-report
                '''
            }
        }

        stage('Prepare Docker volume') {
            steps {
                script {
                    bat(returnStatus: true, script: 'docker volume rm ezoo_node_modules')
                }
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ArtsiukhoyskayaMargo/EZOO.git'
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

        stage('Run Playwright tests in Docker') {
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
                          bash -lc "node -v && npm -v && npm ci && npx playwright test"
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