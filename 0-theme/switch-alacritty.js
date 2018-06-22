#!/usr/bin/env node
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const colorSchemeFile = path.join(__dirname, 'gruvbox/colors.yml')
const alacrittySchemeFile = path.join(__dirname, 'gruvbox/alacritty.yml')
const sourceConfigFile = path.join(__dirname, 'configs/source-alacritty.yml')
const destinationConfigFile = path.join(__dirname, 'configs/alacritty.yml')
const theme = process.argv[2] || 'dark'

function loadYaml(yamlFile) {
	try {
		return yaml.safeLoad(fs.readFileSync(yamlFile, { encoding: 'utf8' }))
	} catch (e) {
		console.error(`Error while loading ${yamlFile}`)
		throw e
	}
}

const colorScheme = loadYaml(colorSchemeFile).colors
const alacrittyScheme = loadYaml(alacrittySchemeFile)
const newAlacrittyColors = alacrittyScheme[theme].colors
const alacrittyConfig = loadYaml(sourceConfigFile)

Object.keys(newAlacrittyColors).forEach(section => {
	Object.keys(newAlacrittyColors[section]).forEach(color => {
		const schemeColorName = newAlacrittyColors[section][color]
		newAlacrittyColors[section][color] = colorScheme[schemeColorName].replace(/^#/g, '0x')
	})
})

alacrittyConfig.colors = newAlacrittyColors

const newAlacrittyConfig = yaml.safeDump(alacrittyConfig, {
	lineWidth: Number.MAX_VALUE,
	noRefs: true,
	noCompatMode: true
})

fs.writeFileSync(destinationConfigFile, newAlacrittyConfig, { encoding: 'utf8' })
