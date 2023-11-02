$(document).ready(() => {
    // Selecionar os elementos
    const $form = $("#addTaskForm")
    const $descriptionInput = $("#descriptionInput")
    const $expireDateInput = $("#expireDateInput")
    const $modal = new bootstrap.Modal("#addTaskModal")
    const createIconButton = (iconClass, btnClasses, clickHandler) => {
        const $button = $("<button></button>").addClass(btnClasses)
        const $icon = $("<i></i>").addClass(iconClass)
        $button.append($icon)
        $button.click(clickHandler)
        return $button
    }
    const createSucessButton = (sucessClass, type, value, clickHandler) => {
        $sucess = $(`<button type="${type}" value="${value}"></button>`).addClass(sucessClass)
        $sucess.text("Concluir")
        $sucess.click(clickHandler)
        return $sucess
    }

    const createInfoButton = (iconClass, buttonClass, type, databstoggle, databstarget, ariaexpanded, ariacontrols) => {
        const $info = $(`<button type="${type}" data-bs-toggle="${databstoggle}" data-bs-target="#${databstarget}" aria-expanded="${ariaexpanded}" aria-controls="${ariacontrols}"></button>`).addClass(buttonClass)
        const $iconInfoButton = $("<i></i>").addClass(iconClass)
        $info.append($iconInfoButton)
        return $info
    }
    // Função para formatar a data de expiração
    const expireDateFormated = (expireDate) => {
        let year = String(expireDate.slice(0, 4))
        let month =  String(expireDate.slice(5, 7))
        let day = String(expireDate.slice(8, 10))
        let FormatedDate = (`${day}/${month}/${year}`)
        return FormatedDate
    }
    
    // Adicionar tarefa na tela
    const addTaskToBoard = (description, expireDate) => {
        const $newTask = $("<div></div>").addClass("item")
        const $taskText = $("<span></span>").text(description)
        const $taskExpireDate = $("<span></span>").append(`Data de expiração: ${expireDateFormated(expireDate)}`).addClass("d-flex align-items-center ms-auto")
        const $newTaskInfo = $(`<div id=${description}></div>`).addClass("collapse card-item")
        const $infoCard = $("<div></div>").addClass("card card-body").text("teste")

        // Variável contendo a informação de click no botão de conclusão
        let clicked = false
        expireDateFormated($expireDateInput.val())
        const $sucessButton = createSucessButton("btn btn-primary btn-sm", "button", "done", () => {
                // Verifica se o botão de Concluir já foi clickado, se não foi, remove a data de expiração e adiciona a data de conclusão
            if (clicked == false) {
                let today = new Date().toLocaleDateString()
                $taskExpireDate.remove()
                $taskConclusionDate = $("<span></span>").append(`Data de conclusão: ${today}`).addClass("d-flex align-items-center ms-auto")
                $inputAndDescriptionContainer.append($taskConclusionDate)
                $sucessIcon = $("<i></i>").addClass("bi bi-check")
                $sucessButton.text("")
                $sucessButton.append($sucessIcon)
                $sucessButton.removeClass("btn-primary")
                $sucessButton.addClass("btn-success")
                $editButton.remove()
                clicked = true
            }
        })
        const $editButton = createIconButton("bi bi-pencil", "btn btn-warning btn-sm", () => {
            const editedText = prompt("Nova descrição", description)
            if (editedText) {
                $taskText.text(editedText)
            }
        })
        const $deleteButton = createIconButton("bi bi-x", "btn btn-danger btn-sm", () => {
            $newTask.remove()
        })

        const $infoButton = createInfoButton("bi bi-info-lg", "btn btn-primary btn-sm", "button", "collapse", description, "false", "extraInfo")
        const $buttonsContainer = $("<div></div>").addClass("d-flex column-gap-2")
        $buttonsContainer.append($editButton, $deleteButton, $infoButton)
        const $inputAndDescriptionContainer = $("<div></div>").addClass("d-flex hstack gap-3 align-items-center inputAndDescription")
        $inputAndDescriptionContainer.append($sucessButton, $taskText, $taskExpireDate)
        $newTaskInfo.append($infoCard)
        $newTask.append($inputAndDescriptionContainer, $buttonsContainer)
        $("#todo").append($newTask, $newTaskInfo)
    }   

    // Evento para o envio do formulário
    $form.submit(event => {
        // Cancelar o comportamento padrão do envio do formulário (Recarregar a página)
        event.preventDefault()

        // Verificar se o formulário é válido
        if ($form[0].checkValidity()) {
            addTaskToBoard($descriptionInput.val(), $expireDateInput.val())
            $form[0].reset()
            $modal.hide()
            $form.removeClass("was-validated")
        } else {
            $form.addClass("was-validated")
        }
    })
    
})
