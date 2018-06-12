export default{
	methods: {
		onPickFile(refTarget) {
			this.$refs[refTarget].click()
		},
		onFilePicked (event, imageType) {
			const file = event.target.files[0]
			let filename = file.name
			// console.log(filename)
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a file with valid extension')
			}
			const fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				this[imageType + 'URL'] = fileReader.result
			})
			fileReader.readAsDataURL(file)

			this[imageType] = file			
			let newData = {}
			newData[imageType] = this[imageType]

			// console.log('imagefile', newData)

			this.$store.dispatch('saveProfileImages', {userId: this.$store.getters.currentUser.id, data: newData} )
		},
		onPostFilePicked(event, imageType) {
			const file = event.target.files[0]
			let filename = file.name
			// console.log(filename)
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a file with valid extension')
			}
			const fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				this.imageURLs.push(fileReader.result)
			})
			fileReader.readAsDataURL(file)

			this.imageFiles.push(file)

			// this.$store.dispatch('savePostImages', {userId: this.$store.getters.currentUser.id, data: newData} )
		},
		onOneFilePicked(event, imageField) {
			const file = event.target.files[0]
			let filename = file.name
			// console.log(filename)
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a file with valid extension')
			}
			const fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				this[imageField].imageURL = fileReader.result
			})
			fileReader.readAsDataURL(file)

			this[imageField].imageFile = file
		}
	}
}