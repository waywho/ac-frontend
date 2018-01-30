export default{
	methods: {
		onPickFile(refTarget) {
			this.$refs[refTarget].click()
		},
		onFilePicked (event, imageType) {
			const file = event.target.files[0]
			let filename = file.name
			console.log(filename)
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

			this.$store.dispatch('saveProfileImages', {userId: this.$store.getters.currentUser.id, data: newData} )
		}
	}
}