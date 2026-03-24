function calculate(down, initialPrincipal, years) {
    let month = 0
    let maxMonths = years*12
    const interest = 0.0575;
    const monthlyInterest = interest/12
    let decimalDown = down/100;
    let principal = initialPrincipal - (initialPrincipal*decimalDown);
    let monthlyPayment = ((monthlyInterest * principal) / (1 - Math.pow(1 + monthlyInterest, -maxMonths)));
    let totalInterest = ((Number(monthlyPayment) * maxMonths) - principal);
    let remainingBalance = (principal);
    let interestPaid = (Number(remainingBalance) / monthlyInterest);
    let principalPaid = (Number(monthlyPayment) - Number(interestPaid));
    let totalLoanCost = (principal + Number(totalInterest))

    const RESULTS = document.getElementById("results");

    RESULTS.innerHTML += "<h1>Amortization Schedule</h1>"
    RESULTS.innerHTML += "<ul><li>Annual Interest Rate: 5.75%</li>" 
                        + "<li>Loan Term: " + years + " years</li>"
                        + "<li>Principal: $" + principal.toFixed(2)  + "</li>"
                        + "<li>Total Interest Paid: $" + totalInterest.toFixed(2)  + "</li>"
                        + "<li>Total Loan Cost: $" + totalLoanCost.toFixed(2)  + "</li>"
                        + "<li>Monthly Payment: $" + monthlyPayment.toFixed(2)  + "</li></ul>"
    while(month <= maxMonths) {
        interestPaid = (remainingBalance * monthlyInterest);
        totalInterest = ((monthlyPayment * maxMonths) - principal);
        principalPaid = (monthlyPayment - interestPaid);
        
        RESULTS.innerHTML += "<p><strong>Month " + month + "</strong> || Monthly Payment: $" + monthlyPayment.toFixed(2) 
        + " || Interest Paid: $" + interestPaid.toFixed(2)  
        + " || Principal Paid: $" + principalPaid.toFixed(2)  
        + " || <em>Remaining Loan Balance: $" + remainingBalance.toFixed(2)  
        + "</em></p>";
        month += 1;
        remainingBalance = (remainingBalance - principalPaid);
    }
    RESULTS.innerHTML += "<p>This ends the Amortization Calculator...</p>"
}

function doCalculation() {
    console.log("Did calculations")
    let userPrincipal = document.getElementById("principal").value;
    let userDown = document.getElementById("down").value;
    let loanLength = document.getElementById("loan").value;
    const RESULTS = document.getElementById("results");
    if (isNaN(userPrincipal) || isNaN(userDown) || isNaN(loanLength)) {
        RESULTS.innerHTML = "<p style='color: red;'>At least one value is not a number!</p>"
        return false;
    }
    if (userPrincipal == "" || userDown == "" || loanLength == "") {
        RESULTS.innerHTML = "<p style='color: red;'>At least one value is empty!</p>"
        return false;
    }
    if (loanLength != 15 && loanLength != 30) {
        RESULTS.innerHTML = "<p style='color: red;'>Loan length must be exactly 15 or 30 years!</p>"
        return false;
    }
    RESULTS.innerHTML = ""
    calculate(userDown, userPrincipal, loanLength);
}