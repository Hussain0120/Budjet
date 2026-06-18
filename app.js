
var budgetInput = document.getElementById("budgetinput");
var setBudgetBtn = document.getElementById("setbudgetbtn");

var expenseTitleInput = document.getElementById("expensetitleinput");

var expenseCostInput = document.getElementById("expensecostinput");
var checkAmountBtn = document.getElementById("checkamountbtn");
var totalBudgetVal = document.getElementById("totalbudgetval");

var totalExpensesVal = document.getElementById("totalexpensesval");
var balanceVal = document.getElementById("balanceval");
var expenseListContainer = document.getElementById("expenselistcontainer");
var totalBudget = 0;
var totalExpenses = 0;
var expensesArray = [];
var editId = null;

function updateDOM() {
    totalBudgetVal.innerText = totalBudget;
    totalExpensesVal.innerText = totalExpenses;
    balanceVal.innerText = totalBudget - totalExpenses;

    expenseListContainer.innerHTML = "";

    for (var i = 0; i < expensesArray.length; i++) {
        var item = expensesArray[i];

        var row = document.createElement("div");
        row.className = "expense-row";

        var titleDiv = document.createElement("div");
        titleDiv.className = "expense-title";
        titleDiv.innerText = item.title;

        var costDiv = document.createElement("div");
        costDiv.className = "expense-cost";
        costDiv.innerText = item.cost;

        var actionsDiv = document.createElement("div");
        actionsDiv.className = "expense-actions";

        var editIcon = document.createElement("i");
        editIcon.className = "fa-regular fa-pen-to-square";
        editIcon.setAttribute("onclick", "editExpense(" + item.id + ")");

        var deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-regular fa-trash-can";
        deleteIcon.setAttribute("onclick", "deleteExpense(" + item.id + ")");

        actionsDiv.appendChild(editIcon);
        actionsDiv.appendChild(deleteIcon);

        row.appendChild(titleDiv);
        row.appendChild(costDiv);
        row.appendChild(actionsDiv);

        expenseListContainer.appendChild(row);
    }
}

setBudgetBtn.addEventListener("click", function() {
    var val = parseFloat(budgetInput.value);
    if (!isNaN(val) && val >= 0) {
        totalBudget = val;
        updateDOM();
        budgetInput.value = "";
    }
});

checkAmountBtn.addEventListener("click", function() {
    var title = expenseTitleInput.value.trim();
    var cost = parseFloat(expenseCostInput.value);

    if (title !== "" && !isNaN(cost) && cost >= 0) {
        if (editId !== null) {
            for (var i = 0; i < expensesArray.length; i++) {
                if (expensesArray[i].id === editId) {
                    totalExpenses = totalExpenses - expensesArray[i].cost + cost;
                    expensesArray[i].title = title;
                    expensesArray[i].cost = cost;
                    break;
                }
            }
            editId = null;
        } else {
            var newExpense = {
                id: new Date().getTime(),
                title: title,
                cost: cost
            };
            expensesArray.push(newExpense);
            totalExpenses += cost;
        }

        updateDOM();
        expenseTitleInput.value = "";
        expenseCostInput.value = "";
    }
});


function editExpense(id) {
    for (var i = 0; i < expensesArray.length; i++) {
        if (expensesArray[i].id === id) {
            expenseTitleInput.value = expensesArray[i].title;
            expenseCostInput.value = expensesArray[i].cost;
            editId = id;
            break;
        }
    }
}
function deleteExpense(id) {
    var filteredArray = [];
    for (var i = 0; i < expensesArray.length; i++) {
        if (expensesArray[i].id === id) {
            totalExpenses -= expensesArray[i].cost;
        } else {
            filteredArray.push(expensesArray[i]);
        }
    }
    expensesArray = filteredArray;
    updateDOM();
}