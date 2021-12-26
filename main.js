$(document).ready(function () {
    displayCharacters();
    $("#formView1").hide();
    $("#deleteForm").hide();
    $("#changeForm").hide();
    showForms();
    initForm();
});

function displayCharacters() {

    $.getJSON("http://localhost:8081/characters", function (characters) {
        console.log(characters);

        for (let index = 0; index < characters.length; index++) {
            const character = characters[index];
            // Pour éviter un bug lié au nom des personnages avec espace 
            let idCharacter = character.name.replace(" ", "");

            $("#characters-list").append("<li id=" + idCharacter + " class=\"navigation-item\">" +
                "<a class=\"navigation-link\" href=\"#\">" + character.name + "</a></li>");

            $("#selectDeleteCharacters").append("<option value=\"" + character.name + "\">" + character.name + "</option>");

            $("#selectChangeCharacters").append("<option value=\"" + character.name + "\">" + character.name + "</option>");

            $("#" + idCharacter).click(function () {
                $("#blankView").html("<ul class=\"listePersos\" >" +
                    "<li> <span class=\"bold\"> Nom:  </span>" + character.name + "</li>" +
                    "<li> <span class=\"bold\"> Sexe: </span>" + displaySexe(character.sexe) + "</li>" +
                    "<li> <span class=\"bold\"> Elément:  </span> " + character.element + "</li>" +
                    "<li> <span class=\"bold\"> Arme:  </span>" + character.weapon + "</li>" +
                    "<li> <span class=\"bold\"> Description:  </span>" + character.description + "</li>" +
                    "<li> <span class=\"bold\"> Nation:  </span>" + character.nation + "</li>" +
                    "<li> <span class=\"bold\"> Image:  </span>" + "<div id=\"picture\">" +
                    "<img src=" + character.imageUrl + "></img>" + "</div>" + "</li >" +
                    "<li> <span class=\"bold\"> Niveau:  </span>" + character.rarity + "</li>" +
                    "</ul>");
            });

        }
        $("#displayNb").append(characters.length);
    });

    $("#confirmSupress").click(function () {
        const supress = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            mode: "cors",
            credentials: "same-origin"
        }
        var selectedCharacter = $("#selectDeleteCharacters").find(":selected").text();

        if (confirm("Etes-vous sûr de vouloir supprimer ce personnage?")) {
            fetch("http://localhost:8081/characters/" + selectedCharacter, supress)
                .then(() => location.reload(true));
        } else {
            location.reload(true);
        }
    });

    $("#confirmChange").click(function () {

        var selectedCharacter1 = $("#selectChangeCharacters").find(":selected").text();

        $.getJSON("http://localhost:8081/characters/" + selectedCharacter1, function (character) {
            $("#inputName").val(character.name);
            $("#inputSexe").val(character.sexe);
            $("#inputElement").val(character.element);
            $("#inputArme").val(character.weapon);
            $("#inputDescription").val(character.description);
            $("#inputNation").val(character.nation);
            $("#inputRank").val(character.rarity);
        });
    });
}


/**
 * Affiche le sexe du personnage.
 * @param {String} sexe "M" ou "F"
 * @returns masculin si M ou féminin si F
 */
function displaySexe(sexe) {
    if (sexe == "M") {
        return "masculin";
    } else {
        return "féminin";
    }
}

function showForms() {
    $("#addBtn").click(function () {
        $("#buttons").hide();
        $("#formView1").show();
        $("#changeForm").hide();
        $("#deleteForm").hide();
    });

    $("#deleteBtn").click(function () {
        $("#deleteForm").toggle();
        $("#changeForm").hide();

    });

    $("#changeBtn").click(function () {
        $("#changeForm").toggle();
        $("#deleteForm").hide();
    });

    $("#home1").click(function () {
        location.reload();
    });

    $("#home2").click(function () {
        location.reload();
    });

    $("#characters-list").click(function () {
        $("#buttons").hide();
        $("#changeForm").hide();
        $("#deleteForm").hide();
    });

    $("#home-icon").click(function () {
        location.reload();
    })
}

function initForm() {
    // https://www.copier-coller.com/valider-ses-formulaires-avec-jquery-validate/


    $("#formCharacters1").validate({
        // Spécifie des règles de validation
        rules: {
            // Le nom de la clé sur la gauche est l'attribut "name" 
            // d'un champ de saisie (input). Les règles de validation sont définies 
            // du côté droit.
            nom: {
                required: true,
            },
            sexe: {
                required: true,
            },
            element: {
                required: true,
            },
            arme: {
                required: true,
            },
            nation: {
                required: true,
            },
            rank: {
                required: true,
                number: true,
            }
        },
        // Spécifie des messages d'erreurs de validation
        messages: {
            nom: "Veuillez insérer un nom.",
            sexe: 'Veuillez indiquer un sexe.',
            element: "Veuillez insérer un élement.",
            arme: "Veuillez indiquer une arme.",
            nation: "Veuillez indiquer une nation.",
            rank: "Veuillez indiquer un chiffre."
        },
        submitHandler: function (form) {

            var name = $("#nom").val();
            var sexe = $("#sexe").val();
            var element = $("#element").val();
            var weapon = $("#arme").val();
            var description = $("#description").val();
            var nation = $("#nation").val();
            var rarity = $("#rank").val();


            const post = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    "sexe": sexe,
                    "element": element,
                    "weapon": weapon,
                    "description": description,
                    "nation": nation,
                    "rarity": rarity
                }),
                mode: "cors",
                credentials: "same-origin"
            }

            fetch("http://localhost:8081/characters/", post)
                .then(() => console.log("done"));

            alert("Le personnage " + name + " a été créé !")
                .then(() => location.reload());
        }
    });


    $("#formCharacters2").validate({
        rules: {
            nom: {
                required: true,
            },
            sexe: {
                required: true,
            },
            element: {
                required: true,
            },
            arme: {
                required: true,
            },
            nation: {
                required: true,
            },
            rank: {
                required: true,
                number: true,
            }
        },
        messages: {
            nom: "Veuillez insérer un nom.",
            sexe: 'Veuillez indiquer un sexe.',
            element: "Veuillez insérer un élement.",
            arme: "Veuillez indiquer une arme.",
            nation: "Veuillez indiquer une nation.",
            rank: "Veuillez indiquer un chiffre."
        },


        submitHandler: function (form) {
            var data = {
                name: $("#inputName").val(),
                sexe: $("#inputSexe").val(),
                element: $("#inputElement").val(),
                weapon: $("#inputArme").val(),
                description: $("#inputDescription").val(),
                nation: $("#inputNation").val(),
                rarity: $("#inputRank").val()

            }

            const change = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body:
                    JSON.stringify(data),

                mode: "cors",
                credentials: "same-origin"
            }

            var selectedCharacter1 = $("#selectChangeCharacters").find(":selected").text();

            fetch("http://localhost:8081/characters/" + selectedCharacter1, change)
                .then(data =>
                    console.log(data)
                );

            alert("Le personnage a bien été modifié !")
                .then(() => location.reload(true));

        }
    });
}
