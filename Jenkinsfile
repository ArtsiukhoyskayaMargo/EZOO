pipeline {
    agent any

    environment {
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\ProgramData\\Jenkins\\playwright-browsers'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ArtsiukhoyskayaMargo/EZOO.git'
            }
        }

        stage('Install') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Test') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
}