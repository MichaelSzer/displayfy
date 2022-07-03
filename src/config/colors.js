
const RGB = {
    'White': {
        'r': 255,
        'g': 255,
        'b': 255
    },
    'Black': {
        'r': 0,
        'g': 0,
        'b': 0
    },
    'Brown': {
        'r': 141,
        'g': 110,
        'b': 0
    },
    'Blue': {
        'r': 66,
        'g': 165,
        'b': 245
    },
    'Yellow': {
        'r': 255,
        'g': 255,
        'b': 88
    },
    'Purple': {
        'r': 156,
        'g': 39,
        'b': 176
    }
}

export const colorToRGB = (color) => RGB[color]