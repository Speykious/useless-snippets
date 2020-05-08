const fs = require('fs')
const { resolve } = require('path')

const raw = fs.readFileSync(
	resolve(__dirname, './scopes.json'),
	{ encoding: 'utf8' }
)

const data = JSON.parse(raw)

let scopes = []

for (const tokenColor of data.tokenColors) {
	if (tokenColor.scope) {
		if (typeof tokenColor.scope === 'string')
			scopes.push(tokenColor.scope)
		else {
			for (const scope of tokenColor.scope)
				scopes.push(scope)
		}
	}
	else
		console.log('Object', tokenColor, 'has no scope')
}

scopes = scopes.sort((a, b) => {
	if (a > b) return 1
	if (b > a) return -1
	return 0
})

fs.writeFileSync(
	resolve(__dirname, './great-scopes.json'),
	JSON.stringify(scopes, null, '\t'),
	{ encoding: 'utf8' }
)