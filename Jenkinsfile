pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/твой-username/ezoo-playwright.git'
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