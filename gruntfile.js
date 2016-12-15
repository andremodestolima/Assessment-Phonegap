// Função "wrapper", onde toda a definição de tarefas deve ficar.
module.exports = function(grunt) {

// Chamada a função initConfig, onde devem ficar os objetos de configuração de cada tarefa.
    grunt.initConfig({
        // Configs do JSHINT, consiste em um array dos arquivos javascript a serem examinados.
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js']
        },
        // Configs do Concat, especifica o array de arquivos font a serem concatenados, e o arquivo de destino
        concat: {
            dist: {
                src: ['src/**/*.js'],
                dest: 'src/application.js'
            }
        },
        // Configs do Uglify, especifica o arquivo fonte, que deve ser minificado, e o arquivo gerado de destino.
        uglify: {
            build: {
                src: 'src/application.js',
                dest: 'www/js/application.min.js'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './lib',
                    install: true,
                    verbose: true,
                    cleanTargetDir: false,
                    cleanBowerDir: false
                }
            }
        }
    });

// Load dos plugins Grunt do NPM
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');

// Registro da tarefa default (executada utilizando o comando grunt sem parâmetros na linha de comando).
    grunt.registerTask('default', ['jshint']);

// Registro de tarefa customizada, chamando uma função
    grunt.registerTask('custom_task', 'custom_task', function() {
        grunt.log.write('Execução de tarefa customizada!').ok();
    });

// Registro de tarefa customizada, encadeando outras tarefas
    grunt.registerTask('build', ['concat', 'uglify']);
};