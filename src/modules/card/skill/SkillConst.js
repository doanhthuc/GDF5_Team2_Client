const SKILL_CONST = {
    0: {
        name: 'Đạn Choáng',
        description: 'Gây mini choáng cho quái trong 0.2s',
        icon: 'res/card/skill/skill_1.png',
        image: 'textures/skill/skill_icon_stun.png',
        stat: {
            stunTime: 0.2,
        }
    },
    1: {
        name: 'Cộng Hưởng',
        description: 'Cộng thêm 10 sát thương khi trong vùng nổ đạn có trên 5 quái',
        icon: 'res/card/skill/skill_2.png',
        image: 'textures/skill/icon_skill_05.png',
        stat: {
            damageUp: 10,
        }
    },
    2: {
        name: 'Tăng Sát',
        description: 'Tăng 50% sát thương cho lần gây sát thương tiếp theo của đạn',
        icon: 'res/card/skill/skill_3.png',
        image: 'textures/skill/skill_icon_armor_break.png',
        stat: {
            damageUp: 0.5,
        }
    },
    3: {
        name: 'Nhớt Độc',
        description: 'Gây độc cho quái bị dính đạn 2 máu/s trong 3s',
        icon: 'res/card/skill/skill_4.png',
        image: 'textures/skill/skill_icon_poison.png',
        stat: {
            damage: 2,
            time: 3,
        }
    },
    4: {
        name: 'Băng Sát',
        description: 'Quái nhận thêm 50% sát thương khi đang bị đóng băng',
        icon: 'res/card/skill/skill_5.png',
        image: 'textures/skill/icon_skill_02.png',
        stat: {
            damageUp: 0.5,
        }
    },
    5: {
        name: 'Đốt Máu',
        description: 'Đốt máu quái khi đi vào vùng đốt 1%/s - tối đa 5 máu/s',
        icon: 'res/card/skill/skill_6.png',
        image: 'textures/skill/skill_icon_burn.png',
        stat: {
            potion: 0.01,
        }
    },
    6: {
        name: 'Làm chậm',
        description: 'Quái đi vào vùng trụ sẽ bị làm chậm 80%',
        icon: 'res/card/skill/skill_7.png',
        image: 'textures/skill/skill_icon_slow.png',
        stat: {
            slowPercent: 0.8,
        }
    }
}