define(["./cloneRow", "./cloneSuggestion", "./parseTagsToArray"],
	   function(cloneRow, cloneSuggestion, parseTagsToArray) {

	let count = 0

	return {

		//tagModel, left, row
		resetTags: function(){
			//Remember the look of the first tag so others can be cloned from it.
			this.tagModel = this.view.tag0;
			//Remember the gutter before the second tag so it can be assigned to the cloned ones.
			this.gutter = this.view.tag1.left;
			//Remember the row flex so others can be cloned from it.
			this.rowModel = this.view.row0;
			//Remove the design-time tags so we can re-populate the row with the dynamic ones.
			this.view.row0.removeAll();
		},

		buildTags: function(){
			var maxWidth = this.view.frame.width;
			var units = this.view.defaultUnit;
			kony.print(`flag Max width: ${maxWidth}, Units: ${units}`);

			var width = 0;
			var row = this.view.row0;
			var nextRowId = 1;
			var tags = parseTagsToArray(this._tags);
			//var tagButtons = [];
			for(var k = 0; k < tags.length; k++){
				var text = tags[k];
				if(text.trim() !== ""){
					//tagButtons.push(clone(tagModel, `tag${k}`, text));
					let tagId = `${row.id}tag${k}`;
					kony.print(`flag Creating tag ${tagId} with text '${text}' in row ${row.id}`);

					var tag = cloneSuggestion(
						this.tagModel,
						tagId,
						text,
						//Add a gutter only after the first tag and onward.
						k>0?this.gutter:null
					);

					tag.onClick = (button)=>{
						//console.log(arguments)
						if(typeof this.onPressed === "function"){
							this.onPressed(button)
						}
						else{
							kony.print(`There's no onPressed callback assigned to these suggestions. Use the onPressed function to assign it.`)
						}
					}
					//We have to add the tag first, so the frame width will be calculated.
					row.add(tag);
					width += tag.frame.width;

					kony.print(`flag Width: ${width}`);

					if(width > maxWidth){
						kony.print(`Remove this last tag ${tagId}:${tag.text} from ${row.id} and create new row`);
						row.removeAt(row.widgets().length-1);

						//TODO: Expose a parameter for the gutter between rows.
						row = cloneRow(this.rowModel, "row" + nextRowId++, "5dp");
						//The first tag in each row does not need a gutter.
						tag.left = "0dp";
						row.add(tag);
						this.view.add(row);
						width = tag.frame.width;
					}
					width += parseInt(this.gutter);
				}
			}
			//this.view.add(tagButtons);
		},

		preShow: function(){
			//this.view.opacity = 0;
			this.resetTags();
		},

		postShow: function(){
			//this.view.opacity = 1;
			let buildingTags = false
			this.view.doLayout = ()=>{
				//kony.print("flag doLayout")
				if(!buildingTags){
					this.buildTags()
					buildingTags = true
				}
			}
		},

		constructor: function(baseConfig/*, layoutConfig, pspConfig*/) {
			count++
			if(typeof baseConfig.id === "undefined"){
				baseConfig.id = "Suggestions" + count
			}
			//baseConfig.height = "60dp"
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;

		},

		initGettersSetters: function() {
			defineGetter(this, "tags", () => {return this._tags;});
			defineSetter(this, "tags", (tags) => {this._tags = tags;});
		}
	};
});