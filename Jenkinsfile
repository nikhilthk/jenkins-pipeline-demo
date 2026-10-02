pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nodejs-jenkins-demo'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build --build-arg BUILD_NUMBER=$BUILD_NUMBER -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh 'docker rm -f demo-app || true'
                sh 'docker run -d --name demo-app -p 3000:3000 $IMAGE_NAME:$BUILD_NUMBER'
            }
        }
    }

    post {
        success { echo 'Pipeline succeeded!' }
        failure { echo 'Pipeline failed.' }
    }
}
