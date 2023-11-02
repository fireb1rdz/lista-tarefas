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
    const addTaskToBoard = (description, expireDate) => {
        const $newTask = $("<div></div>").addClass("item")
        const $taskText = $("<span></span>").text(description)
        const $editButton = createIconButton("bi bi-pencil", "btn btn-warning btn-sm", () => {
            const editedText = prompt("Nova descrição", description)
        })
    }


    
})
