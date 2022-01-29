function getLength(a, b, c){
    let sumLength = a.length + b.length + c.length;
    let avgLength = sumLength / 3;
    console.log(sumLength);
    console.log(Math.floor(avgLength));
}

getLength('chocolate', 'ice cream', 'cake');
getLength('pasta', '5', '22.3');