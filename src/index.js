function customFunc(x) {
    return x * x - Math.cos(x);
}

let intervalLimits, leftLimit, rightLimit;
do {
    intervalLimits = prompt("Введите границы отрезка интегрирования (два числа через пробел)", '').split(" ");
    if (intervalLimits.length != 2) {
        alert("Нужно ввести ровно два значения");
        continue;
    }
    leftLimit = Number(intervalLimits[0]);
    rightLimit = Number(intervalLimits[1]);
    if (isNaN(leftLimit) || isNaN(rightLimit))
        alert("Вводить можно только числа");
    else if (leftLimit > rightLimit)
        alert("Левая граница не должна быть больше правой");
    else
        break;
} while (true)

let eps;
do {
    eps = Number(prompt("Выберете точность интегрирования (в виде эпсилона)"));
    if (isNaN(eps))
        alert("Нужно выбрать число");
    else if (eps <= 0)
        alert("Эпсилон должен быть больше нуля");
    else
        break;
} while (true)

let pointsNumber = 10;
let maxItersNumber = 1000;
let currentIterIdx = 0;
let previousRimanSum;
let needEscape = false;
do {
    let stepSize = (rightLimit - leftLimit) / (pointsNumber - 1);
    let leftX = leftLimit;
    let rightX;
    let rimanSum = 0;
    for(let i = 0; i < pointsNumber - 1; i++) {
        rightX = leftX + stepSize;
        rimanSum += (rightX - leftX) * customFunc(leftX);
        leftX = rightX;
    }
    if (currentIterIdx != 0) {
        if (Math.abs(rimanSum - previousRimanSum) < eps || currentIterIdx == maxItersNumber)
            needEscape = true;
    }    
    previousRimanSum = rimanSum;
    currentIterIdx += 1;
    pointsNumber *= 2;
} while (!needEscape);
alert(`Результат вычисления = ${previousRimanSum} (было выбрано ${pointsNumber / 2} точек интегрирования)`);