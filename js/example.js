

const options = {
    name: 'test',
    width: 1024,
    height: 1024,
    colors: {
        border: 'black',
        bg: 'red'
    }
};

console.log(options);

for (let key in options) {
    console.log(`Властивість ${key} маэ значення ${options[key]}`);
}

