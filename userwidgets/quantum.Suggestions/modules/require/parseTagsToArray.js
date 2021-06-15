define(function () {

	function parseTagsToArray(tags){
		if(typeof tags === "string"){
			return tags.split(",").map((tag) => {return tag.trim()})
		}
		else if (tags instanceof Array){
			return tags
		}
		else{
			throw Error("Unsupported type for tags property in quantum.Suggestions component.")
		}
	}
	return parseTagsToArray
})
