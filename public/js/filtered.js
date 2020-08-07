var strings = ['groente', 'fruit', 'vlees', 'vis', 'zuiverl'];

var filtered = strings.filter(str => {
	return str.includes('g');
});

console.log(filtered);