// If you are inside a state and want to move outside to a global (stateless)
// intent in the next request, use this.removeState()

const FooBar = require("./FooBar")
const FooBaz = require("./FooBaz")

module.exports = {
	FooBar,
	FooBaz
}
