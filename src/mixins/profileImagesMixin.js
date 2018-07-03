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
				this[imageType + 'CurrentURL'] = fileReader.result
			})
			fileReader.readAsDataURL(file)

			this[imageType] = file			
			let newData = {}
			newData[imageType] = this[imageType]

			// console.log('imagefile', newData)

			this.$store.dispatch('saveProfileImages', {userId: this.$store.getters.currentUser.id, data: newData} )
			.then(res => {
				this.$emit('update:' + res.key, res.path)
			})
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
		},
		onMediaFilePicked(event) {
			this.loading = true
			// console.log(event)
			const file = event.target.files[0]

			if(file.size > 5000000) {
				alert("Sorry, the image is too big to upload.")
				return
			}
			let filename = file.name
			// console.log(filename)
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a file with valid extension')
			}
			const fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				this.imageURL = fileReader.result
			})
			fileReader.readAsDataURL(file)

			this.imageFile = file
			let newData = {}
			newData['image-gallery'] = this.imageFile

			this.$store.dispatch('saveMediaImage', {userId: this.$store.getters.currentUser.id, data: newData} )
				.then(res => {
					this.loading = false
				})
		}
	}
}