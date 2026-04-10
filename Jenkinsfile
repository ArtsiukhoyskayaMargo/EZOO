pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.0-jammy'
            args '-u root'
        }
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
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}