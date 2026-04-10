pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.50.0-jammy'
        CONTAINER_WORKDIR = '/work'
    }

    stages {
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

        stage('Run Playwright Tests in Docker') {
            steps {
                bat '''
                    docker run --rm ^
                      -v "%WORKSPACE%:%CONTAINER_WORKDIR%" ^
                      -w %CONTAINER_WORKDIR% ^
                      %DOCKER_IMAGE% ^
                      bash -lc "node -v && npm -v && npm ci && npx playwright test"
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
        }
    }
}