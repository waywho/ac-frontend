import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	strict: false,
	state: {
		staticPages: {
			"center": {
				title: "About",
				heroImage: require('../assets/images/supportheatre.jpg'),
				contentEN: "<p>To date, no solution exists to manage promotional material and other opera singers' data so that these documents are always up-to-date with the stakeholders who use them. Employers, unions, festivals, competitions, auditions, social networks and other websites deal with singers their photos, letters of recommendation, application forms, resumes, biographies, repertory lists, audio and video recordings and contracts. Monitoring is difficult with all these portals and stakeholders; it is almost impossible to keep up with everyone's demands and demands while remaining up-to-date. Dissatisfaction on both sides is thus created and is as harmful to the artists' careers as to the efficiency of the companies that hire them.</p><p>The Boussole des Arts is a turnkey service centered around an interactive portal, first adapted to the needs of the opera industry at www.operaop.com. It straddles the professional network, the tabloid posting job postings and the database package. It offers its users an information system adapted to the needs of opera houses, tools for the production of shows and ticket sales, a professional networking platform for self-employed workers, hosting of pages web promotional and especially a central system of data transfer and automated updates administering both artistic promotional material and production activities.</p>",
				contentFR: "<p>À ce jour, aucune solution n’existe pour gérer les documents promotionnels et autres données des chanteurs d’opéra de manière à ce que ces documents soient toujours à jour chez les intervenants qui recourent. Employeurs, syndicats, festivals, compétitions, auditions, réseaux sociaux et autres sites web transigent avec les chanteurs leurs photos, lettres de recommandation, formulaires d’application, CV, biographies, listes de répertoire,  enregistrements audio et vidéo et contrats. Le suivi est bien difficile avec tous ces portails et intervenants&nbsp;; il s’avère presque impossible de demeurer conforme aux demandes et exigences de chacun tout en demeurant à jour. Des insatisfactions de part et d’autre sont ainsi créées et nuisent autant à la carrière des artistes qu’à l’efficacité des entreprises qui les embauchent. <br><br>La Boussole des Arts est un service clef en main, centré autour d’un portail interactif, adapté d’abord aux besoins inhérents à l’industrie de l’opéra basé à l’adresse www.operaop.com. Il est à cheval entre le réseau professionnel, le tabloïd affichant des offres d’emploi et le progiciel de base de données. Il offre à ses utilisateurs un système d’information adapté aux besoins des maisons d’opéra, des outils au service de la production de spectacles et de la vente de billets, une plateforme de réseautage professionnel destinée aux travailleurs autonomes, l’hébergement de pages web promotionnelles et surtout un système central de transfert de données et de mises à jour automatisées administrant tant les documents promotionnels artistiques que les activités de production.</p>"
			},
			"terms": {
				title: "Terms of Use Agreement",
				heroImage: require('../assets/images/supportheatre.jpg'),
				contentEN: "<p>for Members of La Boussole des arts’ web portals, OperaOp &amp; OperaCompass</p><p>Effective Date: This Terms of Use Agreement was last updated on January&nbsp; 24th, 2013.</p><p>ATTENTION: PLEASE READ THESE TERMS CAREFULLY BEFORE USING THIS WEBSITE OR REGISTERING WITH La Boussole des Arts inc.. USING THIS WEBSITE INDICATES THAT YOU ACCEPT THESE TERMS. IF YOU DO NOT ACCEPT THESE TERMS, IMMEDIATELY CEASE ALL USAGE OF THIS WEBSITE.</p><p>This Terms of Use Agreement (“Agreement”) sets forth the standards of use of the La Boussole des Arts inc. services. La Boussole des Arts inc. reserves the right, at any time, to modify, alter, or update the terms and conditions of this agreement without prior notice. Users will be notified about the changes, with the chance to agree with the new Terms or cancel their account.</p><p><br><h3>1. Registration Terms and Requirements</h3></p><p>Your registration with the La Boussole des Arts inc. service is for your own personal and business use. You may authorize others to use your registration, but you may not assign or otherwise transfer your account to any other person or entity. You are responsible for logging out if your computer is accessible to others. This prevents unauthorized access.</p><p>Either you or La Boussole des Arts inc. may terminate your OperaOp membership at any time, for any reason, without explanation, effective upon sending written notice to La Boussole des Arts inc.. La Boussole des Arts inc. reserves the right to immediately suspend or terminate your access to www.operaop.com, without notice, upon any breach of this Agreement by you.</p><p><br><h3>2. Disclaimer of Warranties.</h3></p><p>La Boussole des Arts inc. provides service on an 'as is' basis and grants no warranties of any kind, expressed, implied, statutory, in any communication with La Boussole des Arts inc. or its representatives, or otherwise with respect to the service. La Boussole des Arts inc.</p><p>specifically disclaims any implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. Local and applicable law may not allow the exclusion of implied warranties, so this exclusion may not apply to you.</p><p><br><h3>3. Modifications and Interruption to Service</h3></p><p>La Boussole des Arts inc. reserves the right to modify or discontinue the OperaOp service with or without notice to the Member. Should La Boussole des Arts inc. discontinue the OperaOp service, La Boussole des Arts inc. will refund membership or advertising fees paid by the Member for those months not used due to La Boussole des Arts inc. service being discontinued. La Boussole des Arts inc. shall not be liable to the Member or any third party for any other reason should La Boussole des Arts inc. exercise its right to modify or discontinue the La Boussole des Arts inc. service. Member acknowledges and accepts that La Boussole des Arts inc. does not guarantee continuous, uninterrupted or secure access to our website and operation of our website may be interfered with or adversely affected by numerous factors or circumstances outside of our control.</p><p><br><h3>4. Limitation of Liability</h3></p><p>La Boussole des Arts inc. is not liable for the integrity of statements made by members or users of www.operaop.com. By registering with OperaOp services, you are agreeing that neither La Boussole des Arts inc. nor any of its associates may be liable for any damages, direct, indirect, incidental and/or consequential, arising out of the use of this service, or any websites linked to this website, including, without limitation, to damages arising out of communicating and/or meeting with other members of this service, or introduced to you via this service. Such damages include, without limitation, monetary damages, physical damages, bodily injury and or emotional distress and discomfort.</p><p>Notwithstanding anything to the contrary contained herein, La Boussole des Arts inc.’s liability to you for any cause whatsoever, under any legal theory whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to La Boussole des Arts inc. for the service during the term of the OperaOp membership.</p><p><br><h3>5. Indemnification</h3></p><p>Member agrees to indemnify and hold La Boussole des Arts inc. its parents, subsidiaries, affiliates, officers and employees, harmless from any claim or demand, including reasonable attorneys’ fees and costs, made by any third party due to or arising out of Member’s use of the<br>OperaOp service, the violation of this Agreement, or infringement by Member, or other user of the Service using Member’s computer, of any<br>intellectual property or any other right of any person or entity.</p><p><h3>6. Information Supplied by Member</h3></p><p>La Boussole des Arts inc. will keep all personal information supplied by you to OperaOp confidential, and shall only use or disclose such information as necessary to ensure the safety and integrity of our Members and users, to fulfill our service obligations to you, and in accordance with our Privacy Policy, see www.operaop.com/privacy. Note that user’s names and/or company names may be disclosed by La<br>Boussole des Arts inc. through publication of a user’s list. No other personal information will accompany such publication. By registering with OperaOp you are consenting to such use of your name and/or company name.</p><p><br><h3>7. Content Posted By Parties Other Than La Boussole des Arts inc.</h3></p><p>Opinions, advice, statements, offers, or other information or content made available through the La Boussole des Arts inc. service of www.operaop.com, but not directly by La Boussole des Arts inc., are those of their respective authors, and should not necessarily be relied upon. Such authors are solely responsible for such content. La Boussole des Arts inc. does not guarantee the accuracy, completeness, or<br>usefulness of any information on the service and neither adopts nor endorses nor is responsible for the accuracy or reliability of any opinion, advice, or statement made by parties other than La Boussole des Arts inc.. Under no circumstances will La Boussole des Arts inc. be&nbsp; responsible for any loss or damage resulting from anyone's reliance on information or other content posted on www.operaop.com or transmitted to OperaOp members.</p><p>It is possible that other OperaOp members or users (including unauthorized users, or 'hackers') may post or transmit offensive materials on the OperaOp website and that you may be involuntarily exposed to such offensive materials. Additionally, should an unauthorized user gain<br>La Boussole des Arts : <a href='http://www.OperaOp.com'>www.OperaOp.com</a> access to La Boussole des Arts inc. site, such unauthorized user may be able to post offensive material directly to artists websites, through the content management system services. La Boussole des Arts inc. takes precautions to avoid unauthorized users from accessing our site; however, we offer no guarantee that such will not occur.</p><p>La Boussole des Arts inc. is not responsible for the use of any personal information that you disclose on the Service. Please carefully select the type of information that you post on the OperaOp service or release to others. La Boussole des Arts inc. reserves the right, but has no obligation, to monitor the materials posted in the public access areas of the www.operaop.com service. The display of any violent or obscene <br>language or picture is strictly prohibited. La Boussole des Arts inc. shall have the right to remove any such material that in its sole opinion violates, or is alleged to violate, the law or this Agreement. Notwithstanding this right of La Boussole des Arts inc., you remain solely responsible for the content of the materials you post in the public access areas of the service and in your private e-mail messages. E-mails or in- Mails sent between you and other OperaOp members that are not readily accessible to the general public will be treated as private by La Boussole des Arts inc. to the extent required by applicable law. Use of this website, including any materials posted to this website by you, is entirely at your own risk.</p><p><br><h3>8. Complaints</h3></p><p>To submit a complaint to La Boussole des Arts inc. regarding the OperaOp service or to report conduct violating this Agreement, you should first contact La Boussole des Arts inc. Customer Support by sending an email at support@operaop.com</p><p><br><h3>9. Disclaimer Regarding Accuracy</h3></p><p>the OperaOp service may obtain Product specifications and other information by the Third parties or collected from publicly available sources. While La Boussole des Arts inc. makes every effort to ensure that the information on this website is accurate, we do not endorse nor make any representations or warranties as to the accuracy or reliability of any information provided on this website. The OperaOp Service may contain information from third parties.</p><p>La Boussole des Arts inc. makes no warranties or representations whatsoever with regard to such information provided, or any results that may be obtained through using them, and you acknowledge that any reliance on representations and warranties provided by any Third party<br>shall be at your own risk.</p><p><br><h3>10. Governing Jurisdiction</h3></p><p>La Boussole des Arts inc. is organized under the laws of the Province of Quebec, in Canada. As such, we are subject to the laws of the Province of Quebec, and such laws will govern this Terms of Use, without giving effect to any choice of law rules. We make no representation that our website or other services are appropriate, legal or available for use in other locations. Accordingly, if you choose to access our site you agree to do so subject to the internal laws of the Province of Quebec, and you are responsible for compliance with applicable local laws. You thus agree to pay the entire fee of the membership you choose to subscribe for.</p><p><br><h3>11. Compliance with Laws</h3></p><p>Member assumes all knowledge of applicable law and is responsible for&nbsp; compliance with any such laws. Member may not use the Service in any way that violates applicable state, federal, or international laws, regulations or other government requirements. Member further agrees<br>not to transmit any material that encourages conduct that could constitute a criminal offense, give rise to civil liability or otherwise violate any applicable local, state, national, or international law or regulation. Access or use of our website from territories where the contents are illegal is prohibited.</p><p><br><h3>12. Proprietary Rights</h3></p><p>La Boussole des Arts inc. owns and retains other proprietary rights in all services offered by OperaOp. www.operaop.com contains the&nbsp; copyrighted material, trademarks, and other proprietary information of www.operaop.com, its licensors and licensees. In addition, other members may post copyrighted information, which has copyright protection whether or not it is identified as copyrighted. Except for that information which is in the public domain or for which you have been given permission, you will not copy, modify, publish, transmit, distribute,<br>perform, display, or sell any such proprietary information. By posting information or content to any public area of www.operaop.com, you automatically grant, and you represent and warrant that you have the right to grant to OperaOp members an irrevocable, perpetual, non-<br>exclusive, fully-paid, worldwide license to use, copy, perform, display and distribute such information and content and to prepare derivative<br>works of, or incorporate into other works, such information and content, and to grant and authorize sub-licenses of the foregoing.</p><p><br><h3>13. Copyrights and Trademark Information</h3></p><p>All content included or available on this site, including site design, text, graphics, interfaces, and the selection and arrangements thereof is<br>©2009-2013 La Boussole des Arts inc., will all rights reserved, or is the property of La Boussole des Arts inc. and/or third parties protected by<br>intellectual property rights. Any use of materials on the website, including reproduction for purposes other than those noted above, modification, distribution, or replication, any form of data extraction or data mining, or other commercial exploitation of any kind, without prior<br>written permission of an authorized officer of La Boussole des Arts inc. is strictly prohibited. Member agree that they will not use any robot, spider, or other automatic device, or manual process to monitor or copy our web pages or the content contained therein without prior written permission of an authorized officer of La Boussole des Arts inc..</p><p>La Boussole des Arts inc., OperaOp, OperaCompass are proprietary marks of La Boussole des Arts inc.. La Boussole des Arts inc.’s trademarks may not be used in connection with any product or service that is not provided by La Boussole des Arts inc., in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits La Boussole des Arts inc..<br><br></p><p></p>",
				contentFR: ""
			}
		},
		conversations: {
			"AlyssaID": {	created: Date.now(),
				sender: 'Alyssa',
				lastMessage: 'How are you?'
			}, 
			"JohnID": {	
				created: Date.now(),
				sender: 'John',
				lastMessage: 'I just had the best news.'
			}, 
			"JamesID": {	
				created: Date.now(),
				sender: 'James',
				lastMessage: 'Grand.'
			}, 
			"JaneID": {	
				created: Date.now(),
				sender: 'Jane',
				lastMessage: 'And then?'
			},
			"EdwardID": {	
				created: Date.now(),
				sender: 'Edward',
				lastMessage: 'And then?'
			},
			"GrantID": {	
				created: Date.now(),
				sender: 'Grant',
				lastMessage: 'And then?'
			}
		},
		users: {
			"AlyssaID": {
				name: "Allysia Johnson",
				role: "Artistic Director",
				img: require("../assets/images/Caitlin-McCaughey.png"),
				city: "Toronto",
				province: "ON",
				profileType: "artist"
			}, 
			"JohnID": {
				name: "John Brian",
				role: "Baritone",
				img: require("../assets/images/Daevyd-Pepper.png"),
				city: "Vancouver",
				province: "BC",
				profileType: "artist"
			}, 
			"JamesID": {
				name: "James Dean",
				role: "Conductor",
				img: require("../assets/images/Brenden-Friesen.png"),
				city: "Montreal",
				province: "QC",
				profileType: "artist"
			}, 
			"JaneID": {
				name: "Jane Great",
				role: "Project Coordinator",
				img: require("../assets/images/Julie-Adams.png"),
				city: "Winnipeg",
				province: "MB",
				profileType: "artist"
			},
			"EdwardId": {
				name: "Edward Great",
				role: "Project Coordinator",
				img: require("../assets/images/Matthew-Dalen.png"),
				city: "Vancouver",
				province: "BC",
				profileType: "artist"
			},
			"GrantID": {
				name: "Grant Ferries",
				role: "Project Coordinator",
				img: require("../assets/images/Leanne-Kaufman.png"),
				city: "Vancouver",
				province: "BC",
				profileType: "artist"
			},
			"JoelID": { 
				name: "Joel Allison",
				role: "Baritone",
				img: require("../assets/images/Joel-Allison.png"),
				city: "Toronto",
				province: "ON",
				profileType: "artist"
			},
			"GeorgiaID": { 
				name: "Georgia Burashko",
				role: "Mezzo Soprano",
				img: require("../assets/images/Georgia-Burashko.png"),
				city: "Toronto",
				province: "ON",
				profileType: "artist"
			}, 
			"DanielID": { name: "Daniel Thielman",
				role: "Tenor",
				img: require("../assets/images/Daniel-Thielman.png"),
				city: "Edmonton",
				province: "AB",
				profileType: "artist"
			}, //asdfasdfsad
			"MyOperaID": {
				name: "MyOpera",
				role: "Artistic Director",
				img: require("../assets/images/myopera-logo.png"),
				city: "Toronto",
				province: "ON",
				profileType: "company"
			}, 
			"YourOperaID": {
				name: "YourOpera",
				role: "Baritone",
				img: require("../assets/images/myopera-logo.png"),
				city: "Vancouver",
				province: "BC",
				profileType: "company"
			}, 
			"GreatOperaID": {
				name: "Great Opera",
				role: "Conductor",
				img: require("../assets/images/myopera-logo.png"),
				city: "Montreal",
				province: "QC",
				profileType: "company"
			}, 
			"MontrealOperaID": {
				name: "Montreal Opera",
				role: "Project Coordinator",
				img: require("../assets/images/myopera-logo.png"),
				city: "Winnipeg",
				province: "MB",
				profileType: "company"
			},
			"OperaInCupID": {
				name: "Opera In a Cup",
				role: "Project Coordinator",
				img: require("../assets/images/myopera-logo.png"),
				city: "Vancouver",
				province: "BC",
				profileType: "company"
			},
			"OperaWorldID": {
				name: "Opera World",
				role: "Project Coordinator",
				img: require("../assets/images/myopera-logo.png"),
				city: "Vancouver",
				province: "BC",
				profileType: "company"
			},
			"TopOperaID": { 
				name: "Top Opera",
				role: "Baritone",
				img: require("../assets/images/myopera-logo.png"),
				city: "Toronto",
				province: "ON",
				profileType: "company"
			},
			"GOOperaID": { 
				name: "Go Opera",
				role: "Mezzo Soprano",
				img: require("../assets/images/myopera-logo.png"),
				city: "Toronto",
				province: "ON",
				profileType: "company"
			}, 
			"BritOperaID": { name: "Brit Opera",
				role: "Tenor",
				img: require("../assets/images/myopera-logo.png"),
				city: "Edmonton",
				province: "AB",
				profileType: "company"
			}
		},
		messages: {
			"AlyssaID": {
				"m1": {
					sender: "Alyssa",
					text: "I am great! Thanks",
					timestamp: 1459361875337,
				},
				"m2": {
					sender: "MyOpera",
					text: "I have a job for you.",
					timestamp: 1459361875340,
				},
				"m3": {
					sender: "Alyssa",
					text: "Wonderful When?",
					timestamp: 1459361875345,
				},
				"m4": {
					sender: "MyOpera",
					text: "Today, can you get here by 5pm?",
					timestamp: 1459361875360,
				}
			},
			"JohnID": {
				"m1": {
					sender: "John",
					text: "I am great! Thanks",
					timestamp: 1459361875337,
				},
				"m2": {
					sender: "MyOpera",
					text: "Thanks for your ,application",
					timestamp: 1459361875340,
				},
				"m3": {
					sender: "John",
					text: "Welcome. When is the audition?",
					timestamp: 1459361875345,
				},
				"m4": {
					sender: "MyOpera",
					text: "Today, can you get here by 5pm?",
					timestamp: 1459361875360,
				}
			},
			"JamesID": {
				"m1": {
					sender: "James",
					text: "Okay. Thanks",
					timestamp: 1459361875337,
				},
				"m2": {
					sender: "MyOpera",
					text: "I need more info about you.",
					timestamp: 1459361875340,
				},
				"m3": {
					sender: "James",
					text: "Ok, I can send it over.",
					timestamp: 1459361875345,
				},
				"m4": {
					sender: "MyOpera",
					text: "Can you send today please?",
					timestamp: 1459361875360,
				}
			},
			"JaneID": {
				"m1": {
					sender: "Jane",
					text: "I am great! Thanks",
					timestamp: 1459361875337,
				},
				"m2": {
					sender: "MyOpera",
					text: "I am sorry but we need more.",
					timestamp: 1459361875340,
				},
				"m3": {
					sender: "Jane",
					text: "I can definitely do that.",
					timestamp: 1459361875345,
				},
				"m4": {
					sender: "MyOpera",
					text: "Today, can you get here by 5pm?",
					timestamp: 1459361875360,
				}
			},
			"EdwardID": {
				"m1": {
					sender: "Edward",
					text: "I would like to audition",
					timestamp: 1459361875337,
				},
				"m2": {
					sender: "MyOpera",
					text: "When would you like to come in?",
					timestamp: 1459361875340,
				},
				"m3": {
					sender: "Edward",
					text: "What about tomorrow",
					timestamp: 1459361875345,
				},
				"m4": {
					sender: "MyOpera",
					text: "Today, can you get here by 5pm?",
					timestamp: 1459361875360,
				}
			},
			"GrantID": {
				"m1": {
					sender: "Grant",
					text: "I am wonderful! Thanks",
					timestamp: 1459361875337,
				},
				"m2": {
					sender: "MyOpera",
					text: "That is great news.",
					timestamp: 1459361875340,
				},
				"m3": {
					sender: "Grant",
					text: "I can definitely do that.",
					timestamp: 1459361875345,
				},
				"m4": {
					sender: "MyOpera",
					text: "Today, when can you get here?",
					timestamp: 1459361875360,
				}
			}
		},
		profiles:{
			'companyXYZ': {
				id: 'companyXYZ',
				type: 'company',
				username: 'MyOpera',
				name: "MY OPERA",
				image: require("../assets/images/myopera-logo.png"),
				coverImage: require("../assets/images/myoperacover.jpg"),
				details: {
					city: "Toronto",
					province: "Ontario",
					connectionStrength: 75,
					connectionLevel: "connected allstar",
					companyType: "Regional",
					country: "Canada",
					memberships: ["Indie Opera TO"],
				},
				notification_settings: [{	
						title: "Notifications on",
						desc: "Lorum ipsum deus domine allorum deus ipsum. Ave Maria lorum ipsum",
						isChecked: true
					}, {
						title: "Notifications sound",
						desc: "Lorum ipsum deus domine allorum deus ipsum. Ave Maria lorum ipsum",
						isChecked: true
					}],
				connections: [{
					firstName: "Alyssa",
					lastName: "Durnie",
					role: "Artistic Director",
					img: require("../assets/images/Alyssa-Durnie.png"),
					type: "staff"
					}, { 
					firstName: "Brittany",
					lastName: "Cann",
					role: "Coordinator",
					img: require("../assets/images/Brittany-Cann.png"),
					type: "staff"
					},
					{ firstName: "Camille",
					lastName: "Rogers",
					role: "Stage Director",
					img: require("../assets/images/Camille-Rogers.png"),
					type: "staff"
					},
					{ firstName: "Dalen",
					lastName: "Roberts",
					role: "Conductor",
					img: require("../assets/images/Dalen-trimmed.png"),
					type: "staff"
					},
					{
					firstName: "Caitlin",
					lastName: "McCaughe",
					role: "Soprano",
					img: require("../assets/images/Caitlin-McCaughey.png"),
					type: "connector"
					},
					{ firstName: "Daevyd",
					lastName: "Pepper",
					role: "Baritone",
					img: require("../assets/images/Daevyd-Pepper.png"),
					type: "connector"
					},
					{ firstName: "Brenden",
					lastName: "Friesen",
					role: "Tenor",
					img: require("../assets/images/Brenden-Friesen.png"),
					type: "connector"
					},
					{ firstName: "Julie",
					lastName: "Adams",
					role: "Mezzo Soprano",
					img: require("../assets/images/Julie-Adams.png"),
					type: "connector"
					}],
				auditions: [{
		    		title: "General Audition",
		    		address: "2351 Audition Street",
		    		city: "Toronto",
		    		applicationDeadline: 1512892800,
		    		date: 1514188800,
		    		starts: 1514188800,
		    		ends: 1514217600,
		    		type: "general",
		    		voiceTypes: ['soprano', 'mezzo soprano', 'tenor'],
		    		pianist: true,
		    		oppType: "paid",
		    		description: "Amazing opportunity for emerging singers",
		    		invitedCandidates: [{
						firstName: "Caitlin",
						lastName: "McCaughey",
						voice_type: "Soprano",
						img: require("../assets/images/Caitlin-McCaughey.png"),
						city: "Vancouver",
						province: "BC",
						selected: true
						},
						{ firstName: "Daevyd",
						lastName: "Pepper",
						voice_type: "Baritone",
						img: require("../assets/images/Daevyd-Pepper.png"),
						city: "Calgary",
						province: "AB",
						selected: false
						},
						{ firstName: "Brenden",
						lastName: "Friesen",
						voice_type: "Tenor",
						img: require("../assets/images/Brenden-Friesen.png"),
						city: "Montreal",
						province: "QC",
						selected: true
						},
						{ firstName: "Julie",
						lastName: "Adams",
						voice_type: "Mezzo Soprano",
						img: require("../assets/images/Julie-Adams.png"),
						city: "Winnipeg",
						province: "MB",
						selected: true
						},
						{ firstName: "Matthew",
						lastName: "Dalen",
						voice_type: "Bass",
						img: require("../assets/images/Matthew-Dalen.png"),
						city: "Toronto",
						province: "ON",
						selected: false
						},
						{ firstName: "Leanne",
						lastName: "Kaufman",
						voice_type: "Soprano",
						img: require("../assets/images/Leanne-Kaufman.png"),
						city: "Vancouver",
						province: "BC",
						selected: true
						},
						{ firstName: "Joel",
						lastName: "Allison",
						voice_type: "Baritone",
						img: require("../assets/images/Joel-Allison.png"),
						city: "Toronto",
						province: "ON",
						selected: false
						}],
					schedule: [{
						time: 1513584000,
						candidate: "Joel Allison"
					}, { time: 1513584900,
						candidate: "Leanne Kaufman"
						}]
					}, {
		    		title: "Specific Audition",
		    		address: "2351 Audition Street",
		    		city: "Vancouver",
		    		applicationDeadline: 1512892800,
		    		date: 1514188800,
		    		starts: 1514188800,
		    		ends: 1514217600,
		    		type: "general",
		    		voiceTypes: ['soprano', 'mezzo soprano', 'tenor'],
		    		pianist: true,
		    		oppType: "paid",
		    		description: "Amazing opportunity for emerging singers",
		    		invitedCandidates: [{
						firstName: "Caitlin",
						lastName: "McCaughey",
						voice_type: "Soprano",
						img: require("../assets/images/Caitlin-McCaughey.png"),
						city: "Vancouver",
						province: "BC",
						selected: true
						},
						{ firstName: "Daevyd",
						lastName: "Pepper",
						voice_type: "Baritone",
						img: require("../assets/images/Daevyd-Pepper.png"),
						city: "Calgary",
						province: "AB",
						selected: false
						},
						{ firstName: "Brenden",
						lastName: "Friesen",
						voice_type: "Tenor",
						img: require("../assets/images/Brenden-Friesen.png"),
						city: "Montreal",
						province: "QC",
						selected: true
						},
						{ firstName: "Julie",
						lastName: "Adams",
						voice_type: "Mezzo Soprano",
						img: require("../assets/images/Julie-Adams.png"),
						city: "Winnipeg",
						province: "MB",
						selected: true
						},
						{ firstName: "Matthew",
						lastName: "Dalen",
						voice_type: "Bass",
						img: require("../assets/images/Matthew-Dalen.png"),
						city: "Toronto",
						province: "ON",
						selected: false
						},
						{ firstName: "Leanne",
						lastName: "Kaufman",
						voice_type: "Soprano",
						img: require("../assets/images/Leanne-Kaufman.png"),
						city: "Vancouver",
						province: "BC",
						selected: true
						},
						{ firstName: "Joel",
						lastName: "Allison",
						voice_type: "Baritone",
						img: require("../assets/images/Joel-Allison.png"),
						city: "Toronto",
						province: "ON",
						selected: false
						}],
					schedule: [{
						time: 1513584000,
						candidate: "Joel Allison"
					}, { time: 1513584900,
						candidate: "Leanne Kaufman"
						}]
					}, {
		    		title: "Specific Audition",
		    		address: "2351 Audition Street",
		    		city: "Vancouver",
		    		applicationDeadline: 1512892800,
		    		date: 1514188800,
		    		starts: 1514188800,
		    		ends: 1514217600,
		    		type: "general",
		    		voiceTypes: ['soprano', 'mezzo soprano', 'tenor'],
		    		pianist: true,
		    		oppType: "paid",
		    		description: "Amazing opportunity for emerging singers",
		    		invitedCandidates: [{
						firstName: "Caitlin",
						lastName: "McCaughey",
						voice_type: "Soprano",
						img: require("../assets/images/Caitlin-McCaughey.png"),
						city: "Vancouver",
						province: "BC",
						selected: true
						},
						{ firstName: "Daevyd",
						lastName: "Pepper",
						voice_type: "Baritone",
						img: require("../assets/images/Daevyd-Pepper.png"),
						city: "Calgary",
						province: "AB",
						selected: false
						},
						{ firstName: "Brenden",
						lastName: "Friesen",
						voice_type: "Tenor",
						img: require("../assets/images/Brenden-Friesen.png"),
						city: "Montreal",
						province: "QC",
						selected: true
						},
						{ firstName: "Julie",
						lastName: "Adams",
						voice_type: "Mezzo Soprano",
						img: require("../assets/images/Julie-Adams.png"),
						city: "Winnipeg",
						province: "MB",
						selected: true
						},
						{ firstName: "Matthew",
						lastName: "Dalen",
						voice_type: "Bass",
						img: require("../assets/images/Matthew-Dalen.png"),
						city: "Toronto",
						province: "ON",
						selected: false
						},
						{ firstName: "Leanne",
						lastName: "Kaufman",
						voice_type: "Soprano",
						img: require("../assets/images/Leanne-Kaufman.png"),
						city: "Vancouver",
						province: "BC",
						selected: true
						},
						{ firstName: "Joel",
						lastName: "Allison",
						voice_type: "Baritone",
						img: require("../assets/images/Joel-Allison.png"),
						city: "Toronto",
						province: "ON",
						selected: false
						}],
					schedule: [{
						time: 1513584000,
						candidate: "Joel Allison"
					}, { time: 1513584900,
						candidate: "Leanne Kaufman"
						}]
					}
				],
				auditionCandidates: [{
					firstName: "Caitlin",
					lastName: "McCaughey",
					voice_type: "Soprano",
					img: require("../assets/images/Caitlin-McCaughey.png"),
					city: "Vancouver",
					province: "BC",
					selected: true
					},
					{ firstName: "Daevyd",
					lastName: "Pepper",
					voice_type: "Baritone",
					img: require("../assets/images/Daevyd-Pepper.png"),
					city: "Calgary",
					province: "AB",
					selected: false
					},
					{ firstName: "Brenden",
					lastName: "Friesen",
					voice_type: "Tenor",
					img: require("../assets/images/Brenden-Friesen.png"),
					city: "Montreal",
					province: "QC",
					selected: true
					},
					{ firstName: "Julie",
					lastName: "Adams",
					voice_type: "Mezzo Soprano",
					img: require("../assets/images/Julie-Adams.png"),
					city: "Winnipeg",
					province: "MB",
					selected: true
					},
					{ firstName: "Matthew",
					lastName: "Dalen",
					voice_type: "Bass",
					img: require("../assets/images/Matthew-Dalen.png"),
					city: "Toronto",
					province: "ON",
					selected: false
					},
					{ firstName: "Leanne",
					lastName: "Kaufman",
					voice_type: "Soprano",
					img: require("../assets/images/Leanne-Kaufman.png"),
					city: "Vancouver",
					province: "BC",
					selected: true
					},
					{ firstName: "Joel",
					lastName: "Allison",
					voice_type: "Baritone",
					img: require("../assets/images/Joel-Allison.png"),
					city: "Toronto",
					province: "ON",
					selected: false
					},
					{ firstName: "Georgia",
					lastName: "Burashko",
					voice_type: "Mezzo Soprano",
					img: require("../assets/images/Georgia-Burashko.png"),
					city: "Toronto",
					province: "ON",
					selected: true
					}, 
					{ firstName: "Daniel",
					lastName: "Thielman",
					voice_type: "Tenor",
					img: require("../assets/images/Daniel-Thielman.png"),
					city: "Edmonton",
					province: "AB",
					selected: true
					}
				],
				events: [{
					date: '2017/12/15',
					start: '',
					end: '',
					title: 'Foo',
					location: '',
					desc: 'longlonglong description',
					type: 'production'
				}, { 
					date: '2017/11/15',
					start: '',
					end: '',
					title: 'Wonderful Event',
					location: '',
					desc: "bar",
					type: 'rehearsal'
				}],
				posts: [
					{
					content: 'Veniam tofu raw denim id. Waistcoat culpa consequat DIY, aliqua try-hard fugiat taxidermy succulents. Enim helvetica viral heirloom raclette. Veniam duis salvia taiyaki poke thundercats before they sold out meh hella dolore skateboard. Swag fam glossier ut.',
					imgs: "",
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Ed Remi',
							user_img: require("../assets/images/Brenden-Friesen.png"),
							commentText: 'Pounce on unsuspecting person eat prawns daintily with a claw then lick paws clean wash down prawns with a lap.',
							timestamp: 	1508521637
						}, {
							user: 'Jane Smith',
							user_img: require("../assets/images/Camille-Rogers.png"),
							commentText: 'The short, stubby, 11.2-ounce Duvel-style bottle releases a dark, leathery-brown brew, with a tan-colored, super-tight, creamy, fluffy lacing.',
							timestamp: 	1508521637
						}]
					}, {
					content: 'Doggo ipsum floofs the neighborhood pupper bork. Stop it fren pupper heckin good boys and girls long bois the neighborhood pupper shooberino, boofers clouds heckin angery woofer very jealous pupper.',
					imgs: [require("../assets/images/greathall.jpg"), require("../assets/images/stagetub.jpg")],
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Ed Remi',
							user_img: require("../assets/images/Dalen-trimmed.png"),
							commentText: 'Cake bear claw cheesecake oat cake candy canes chocolate.',
							timestamp: 	1508521637
						}, {
							user: 'Jane Smith',
							user_img: require("../assets/images/Caitlin-McCaughey.png"),
							commentText: 'The short, stubby, 11.2-ounce Duvel-style bottle releases a dark, leathery-brown brew, with a tan-colored, super-tight, creamy, fluffy lacing.',
							timestamp: 	1508521637
						}]
					},{
					content: 'Boof you are doing me a frighten he made many woofs stop it fren, sub woofer very jealous pupper. Boofers puggorino shoober long water shoob what a nice floof boof, dat tungg tho shoob floofs.',
					imgs: "",
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Edward Great',
							user_img: require("../assets/images/Daniel-Thielman.png"),
							commentText: 'Pounce on unsuspecting person eat prawns daintily with a claw then lick paws clean wash down prawns with a lap.',
							timestamp: 	1508521637
						}, {
							user: 'Jane Smith',
							user_img: require("../assets/images/Leanne-Kaufman.png"),
							commentText: 'Marshmallow topping sweet jujubes bonbon cupcake I love sweet roll I love.',
							timestamp: 	1508521637
						}]
					},{
					content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia?',
					imgs: [require("../assets/images/backstage.gif")],
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Maggie Gyllenhall',
							user_img: require("../assets/images/Georgia-Burashko.png"),
							commentText: 'Dessert apple pie wafer jelly cupcake. Sweet donut brownie bear claw.',
							timestamp: 	1508521637
						}, {
							user: 'Tom Price',
							user_img: require("../assets/images/Julie-Adams.png"),
							commentText: 'Gingerbread gummi bears bonbon cheesecake wafer tiramisu. ',
							timestamp: 	1508521637
						}]
					}

				]
			},
			'artistXYZ': {
				id: 'artistXYZ',
				type: 'artist',
				username: 'johnsmith',
				name: "John Smith",
				image: require("../assets/images/Dalen-trimmed.png"),
				coverImage: require("../assets/images/baritoneCover.jpg"),
				details: {
					city: "Vancouver",
					province: "British Columbia",
					connectionStrength: 80,
					connectionLevel: "connected allstar",
					voiceType: "tenor",
					country: "Canada",
					memberships: ["Indie Opera TO", "Tapestry Opera", "L'Opera de Montreal"],
				},
				notification_settings: [{	
						title: "Notifications on",
						desc: "Lorum ipsum deus domine allorum deus ipsum. Ave Maria lorum ipsum",
						isChecked: true
					}, {
						title: "Notifications sound",
						desc: "Lorum ipsum deus domine allorum deus ipsum. Ave Maria lorum ipsum",
						isChecked: true
				}],
				cv: {
					education: [{
						from: 2002 ,
						to: 2006,
						institution: "University of British Columbia",
						accomplishment: "Bachelor of Music",
						major: "Vocal Performance"
					}, {
						from: 2006 ,
						to: 2008,
						institution: "Manhattan School of Music",
						accomplishment: "Master of Music",
						major: "Opera Performance"
					}],
					awards: [{
						year: 2011,
						accomplishment: "Finalist",
						competition: "Liederkranz Foundation"
					},{
						year: 2010,
						accomplishment: "Finalist",
						competition: "Bel Canto Foundation Grants"
					},{
						year: 2010,
						accomplishment: "",
						competition: "Career Bridges Encouragement Grants"
					},{
						year: 2010,
						accomplishment: "Semi-Finalist",
						competition: "Competizione dell'Opera"
					}],
					opera_roles:[{
						role: "Marcello",
						opera: "La Boheme",
						composer: "Puccini",
						company: "Des Moines Metro Opera",
						year: 2017
					},{
						role: "Dr. Falke",
						opera: "Die Fledermaus",
						composer: "Strass",
						company: "Opera Company of Brooklyn",
						year: 2010
					},{
						role: "Marcello",
						opera: "La Boheme",
						composer: "Puccini",
						company: "Opera Memphis",
						year: 2010
					},{
						role: "Don Giovanni",
						opera: "Don Giovanni",
						composer: "Mozart",
						company: "American Lyric Theatre",
						year: 2007
					},{
						role: "Guglielmo",
						opera: "Cosi fan tutte",
						composer: "Mozart",
						company: "Project Opera Manhattan",
						year: 2007
					},{
						role: "Milford",
						opera: "L'Italiana in Londre",
						composer: "Cimarosa",
						company: "Manhattan School of Music",
						year: 2007
					}],
					instructors: ['John Baker', 'Anthony Strong', 'Mark Oswald', 'Carlos Serrano'],
					coaches: ['Liz Marcus', 'John Paul', 'Ken Merrill'],
					directors: ['John Ramster', 'Matthew Lata', 'Sam Helfrich', 'Nelson Sheeley'],
					conductors: ['Michael Change', 'Victor DeRenzi', 'Curt Tucker', 'Steven Mostleer']
				},
				connections: [
					{ firstName: "Camille",
					lastName: "Rogers",
					role: "Stage Director",
					img: require("../assets/images/Camille-Rogers.png"),
					type: "staff"
					},{ firstName: "Dalen",
					lastName: "Roberts",
					role: "Conductor",
					img: require("../assets/images/Dalen-trimmed.png"),
					type: "staff"
					}, {
					firstName: "Alyssa",
					lastName: "Durnie",
					role: "Artistic Director",
					img: require("../assets/images/Alyssa-Durnie.png"),
					type: "staff"
					}, { 
					firstName: "Brittany",
					lastName: "Cann",
					role: "Coordinator",
					img: require("../assets/images/Brittany-Cann.png"),
					type: "staff"
					}, {
					firstName: "Caitlin",
					lastName: "McCaughe",
					role: "Soprano",
					img: require("../assets/images/Caitlin-McCaughey.png"),
					type: "connector"
					},
					{ firstName: "Daevyd",
					lastName: "Pepper",
					role: "Baritone",
					img: require("../assets/images/Daevyd-Pepper.png"),
					type: "connector"
					},
					{ firstName: "Brenden",
					lastName: "Friesen",
					role: "Tenor",
					img: require("../assets/images/Brenden-Friesen.png"),
					type: "connector"
					},
					{ firstName: "Julie",
					lastName: "Adams",
					role: "Mezzo Soprano",
					img: require("../assets/images/Julie-Adams.png"),
					type: "connector"
					}
				],
				events: [{
					date: '2017/12/15',
					start: '',
					end: '',
					title: 'Foo',
					location: '',
					desc: 'longlonglong description',
					type: 'production'
				}, { 
					date: '2017/11/15',
					start: '',
					end: '',
					title: 'Wonderful Event',
					location: '',
					desc: "bar",
					type: 'rehearsal'
				}],
				posts: [
					{
					content: 'Veniam tofu raw denim id. Waistcoat culpa consequat DIY, aliqua try-hard fugiat taxidermy succulents. Enim helvetica viral heirloom raclette. Veniam duis salvia taiyaki poke thundercats before they sold out meh hella dolore skateboard. Swag fam glossier ut.',
					imgs: "",
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Ed Remi',
							user_img: require("../assets/images/Brenden-Friesen.png"),
							commentText: 'Pounce on unsuspecting person eat prawns daintily with a claw then lick paws clean wash down prawns with a lap.',
							timestamp: 	1508521637
						}, {
							user: 'Jane Smith',
							user_img: require("../assets/images/Camille-Rogers.png"),
							commentText: 'The short, stubby, 11.2-ounce Duvel-style bottle releases a dark, leathery-brown brew, with a tan-colored, super-tight, creamy, fluffy lacing.',
							timestamp: 	1508521637
						}]
					}, {
					content: 'Doggo ipsum floofs the neighborhood pupper bork. Stop it fren pupper heckin good boys and girls long bois the neighborhood pupper shooberino, boofers clouds heckin angery woofer very jealous pupper.',
					imgs: [require("../assets/images/greathall.jpg"), require("../assets/images/stagetub.jpg")],
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Ed Remi',
							user_img: require("../assets/images/Dalen-trimmed.png"),
							commentText: 'Cake bear claw cheesecake oat cake candy canes chocolate.',
							timestamp: 	1508521637
						}, {
							user: 'Jane Smith',
							user_img: require("../assets/images/Caitlin-McCaughey.png"),
							commentText: 'The short, stubby, 11.2-ounce Duvel-style bottle releases a dark, leathery-brown brew, with a tan-colored, super-tight, creamy, fluffy lacing.',
							timestamp: 	1508521637
						}]
					},{
					content: 'Boof you are doing me a frighten he made many woofs stop it fren, sub woofer very jealous pupper. Boofers puggorino shoober long water shoob what a nice floof boof, dat tungg tho shoob floofs.',
					imgs: "",
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Edward Great',
							user_img: require("../assets/images/Daniel-Thielman.png"),
							commentText: 'Pounce on unsuspecting person eat prawns daintily with a claw then lick paws clean wash down prawns with a lap.',
							timestamp: 	1508521637
						}, {
							user: 'Jane Smith',
							user_img: require("../assets/images/Leanne-Kaufman.png"),
							commentText: 'Marshmallow topping sweet jujubes bonbon cupcake I love sweet roll I love.',
							timestamp: 	1508521637
						}]
					},{
					content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia?',
					imgs: [require("../assets/images/backstage.gif")],
					timestamp: 	1508518037,
					likes: 24,
					comments: [{
							user: 'Maggie Gyllenhall',
							user_img: require("../assets/images/Georgia-Burashko.png"),
							commentText: 'Dessert apple pie wafer jelly cupcake. Sweet donut brownie bear claw.',
							timestamp: 	1508521637
						}, {
							user: 'Tom Price',
							user_img: require("../assets/images/Julie-Adams.png"),
							commentText: 'Gingerbread gummi bears bonbon cheesecake wafer tiramisu. ',
							timestamp: 	1508521637
						}]
					}

				]
			},
		}

	},
	getters: {
		
	},
	mutations: {
		
	},
	actions: {
		
	}
})