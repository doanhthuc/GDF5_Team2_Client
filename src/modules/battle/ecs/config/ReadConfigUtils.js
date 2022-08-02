let ReadConfigUtils = ReadConfigUtils || {};

ReadConfigUtils.getTowerRankByLevel = function (level) {
    if (level <= 1) {
        return 1;
    } else if (level > 1 && level <= 3) {
        return 2;
    } else if (level >= 4) {
        return 3;
    }
}

ReadConfigUtils.getTowerCharRankByLevel = function (level) {
    switch (level) {
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
    }
}