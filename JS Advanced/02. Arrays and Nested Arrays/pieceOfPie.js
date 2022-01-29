function solve(arr, pie1, pie2){
    let result = [];
    if (arr.includes(pie1) && arr.includes(pie2)) {
        let index1 = arr.indexOf(pie1);
        let index2 = arr.indexOf(pie2);

        result = arr.slice(index1, index2 + 1);
    }

    return result;
}

solve(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'
['Apple Crisp',
'Mississippi Mud Pie',
'Pot Pie',
'Steak and Cheese Pie',
'Butter Chicken Pie',
'Smoked Fish Pie'],
'Pot Pie',
'Smoked Fish Pie');

