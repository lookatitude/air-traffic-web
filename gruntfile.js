/**
 * deploy (development -dev, productions -prod)
 * grunt deploy -hosting (hosting)
 * grunt deploy -functions (functions)
 * grunt deploy (all)
 *
 * serve (development -dev, productions -prod)
 * grunt serve -hosting (hosting)
 * grunt serve -functions (functions)
 */

module.exports = (grunt) => {
    grunt.initConfig({
        wait:{
            nvm:{
                options:{
                    delay:100
                }
            }
        },
        shell:{
            project:{
                command:() => {
                    let project = grunt.file.readJSON("projects/" + grunt.option("project") + ".json");
                    let stage = (grunt.option("prod") ? "prod" : "dev");

                    return "firebase use " + project[stage].name;
                }
            },
            serve:{
                command:(stage) => {
                    return "npm run " + (stage === "prod" ? "start:prod" : "start") + " --prefix public";
                }
            },
            build:{
                command:(target) => {
                    if(target === "hosting"){
                        return "npm run build:prod --prefix public";
                    }

                    if(target === "functions"){
                        return [
                            "npm run lint --prefix functions",
                            "npm run build --prefix functions"
                        ].join("&&");
                    }

                    return [
                        "npm run build:prod --prefix public",
                        "npm run lint --prefix functions",
                        "npm run build --prefix functions"
                    ].join("&&");
                }
            },
            deploy:{
                command:(target) => {
                    let command = "firebase deploy";

                    if(target === "hosting"){
                        command += " --only hosting";
                    }else if(target === "functions"){
                        command += " --only functions";
                    }

                    return command;
                }
            },
            nvm8:{
                command:"nvm use 8.9.1"
            },
            nvm9:{
                command:"nvm use 9.4.0"
            }
        },
        express:{
            dev:{
                options:{
                    script:"functions/lib/app.js",
                    node_env:"dev"
                }
            },
            prod:{
                options:{
                    script:"functions/lib/app.js",
                    node_env:"prod"
                }
            }
        },
        watch:{
            ts:{
                files:["functions/src/**/*.ts"],
                tasks:["shell:build:functions", "express:dev"],
                options:{
                    spawn:false
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-wait");

    grunt.registerTask("project", () => {
        let project = grunt.file.readJSON("projects/" + grunt.option("project") + ".json");
        let stage = (grunt.option("prod") ? "prod" : "dev");

        grunt.file.write("functions/service-account-key.json", JSON.stringify(project[stage]["accountKey"]));
    });

    grunt.registerTask("buildForDebug", () => {
        grunt.task.run(["shell:nvm9", "wait:nvm", "shell:build:functions"]);
    });

    grunt.registerTask("serve", () => {
        let stage = (grunt.option("prod") ? "prod" : "dev");
        let tasks = ["project"];

        if(grunt.option("hosting")){
            //tasks = ["shell:nvm8", "wait:nvm", "npm start --cwd public --prefix public"];
            tasks.push("shell:project", "shell:nvm8", "wait:nvm", "shell:serve:" + stage);
        }else{
            tasks.push("shell:project", "shell:nvm9", "wait:nvm", "shell:build:functions", "express:" + stage, "watch");
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask("deploy", () => {
        let tasks = ["project"];

        if(grunt.option("hosting")){
            tasks.push("shell:project", "shell:nvm8", "wait:nvm", "shell:build:hosting", "shell:nvm9", "wait:nvm", "shell:deploy:hosting");
        }else if(grunt.option("functions")){
            tasks.push("shell:project", "shell:nvm9", "wait:nvm", "shell:build:functions", "shell:deploy:functions");
        }else{
            tasks.push("shell:project", "shell:nvm8", "wait:nvm", "shell:build:hosting", "shell:nvm9", "wait:nvm", "shell:build:functions", "shell:deploy:all");
        }

        grunt.task.run(tasks);
    });
};
