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