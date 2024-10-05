pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/pasindu222/Mario-Game2.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t pasindueranga/node-mario:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'testdockerhubpass', variable: 'test-dockerhubpass')]) {
                    script {
                        bat "docker login -u pasindueranga -p %test-dockerhubpass%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push pasindueranga/nodeapp-cuban:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}
