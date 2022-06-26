const UiUtil = {
    convertIntToString: function (number) {
        let res = "", count = 0;
        while (number) {
            res = (number % 10).toString() + res;
            count += 1;
            number = Math.floor(number / 10);
            if (count % 3 === 0 && number !== 0) {
                res = "." + res;
            }
        }
        return res;
    },

    centerNodeInParent: function (node, parentWidth, parentHeight) {
        node.setPosition(parentWidth / 2, parentHeight / 2);
    },

    centerHorizontalNodeInParent: function (node, parentWidth) {
        node.setPositionX(parentWidth / 2);
    },

    centerVerticalNodeInParent: function (node, parentHeight) {
        node.setPositionY(parentHeight / 2);
    }
}

Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
};

const getRankCharacter = (rankNumber) => {
    // Because rankNumber is from 1 so we need to minus 1 to get the correct character
    if (rankNumber <= 1) {
        return "C";
    } else if (rankNumber > 1 && rankNumber <= 3) {
        return "B";
    } else if (rankNumber >= 4) {
        return "A";
    }
}

const isSpellCard = (carId) => {
    for (let key of Object.keys(CARD_TYPE.SPELL)) {
        if (key == carId) {
            return true;
        }
    }
    return false;
}