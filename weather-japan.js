import request from 'request'
import dayjs from 'dayjs'
import { weatherCodes } from './weather-codes.js'

const JMA = 'https://www.jma.go.jp/bosai/forecast/data/forecast/010000.json'

const options = {
  url: JMA,
  method: 'GET',
  json: true
}

function main () {
  request(options, function (error, response, bodies) {
    if (error) { return }

    const today = dayjs(bodies[0].srf.timeSeries[0].timeDefines[0])
    const names = []
    const weathers = []

    bodies.forEach(body => {
      names.push(body.name)

      const pops = []
      pops.push(body.srf.timeSeries[1].areas.pops)
      pops.push(body.week.timeSeries[0].areas.pops[1])

      const molderPops = moldPops(pops)

      weathers.push([`${weatherCodes[body.week.timeSeries[0].areas.weatherCodes[0]]}${molderPops[0]}`,
      `${weatherCodes[body.week.timeSeries[0].areas.weatherCodes[1]]}${molderPops[1]}`,
      `${weatherCodes[body.week.timeSeries[0].areas.weatherCodes[2]]}${molderPops[2]}`])
    })

    const maxSizes = []
    swap(weathers).forEach(weather => maxSizes.push(maxStringLength(weather)))

    const justifiedDays = []
    for (let i = 0; i < 3; i++) {
      justifiedDays.push(toFullPitchCharacter(leftJustify(maxSizes[i], today.add(i, 'day').format('MM／DD'))))
    }

    const firstLine = `${leftJustify(3, '       ')}│${justifiedDays[0]}│${justifiedDays[1]}│${justifiedDays[2]}`
    console.log(firstLine)
    console.log('━'.repeat(firstLine.length + 15))

    const justifiedWeather = []
    weathers.forEach(weather => {
      justifiedWeather.push(weather.map((weatherForTheDay, i) => leftJustify(maxSizes[i], weatherForTheDay)))
    })

    justifiedWeather.forEach((weather, i) => {
      console.log(`${leftJustify(3, names[i])} │ ${weather.join('│ ')}`)
    })

    footer()
  })
}

const footer = () => {
  const source = '出典：気象庁ホームページ　（ https://www.jma.go.jp/ ）' + '\n' + `気象庁「全国の天気予報」 （ ${JMA} ）を加工して作成`
  console.log('\n' + source)
}

function swap (array) {
  const swaped = []

  for (let i = 0; i < array[0].length; i++) {
    const elements = []
    for (let l = 0; l < array.length; l++) {
      elements.push(array[l][i])
    }
    swaped.push(elements)
  }

  return swaped
}

function maxStringLength (stringArray) {
  const arrayMax = function (a, b) { return Math.max(a, b) }

  const lengthArray = stringArray.map(str => str.length)
  return lengthArray.reduce(arrayMax)
}

function leftJustify (length, string) {
  const fill = []

  while (fill.length + string.length < length) {
    fill.push('  ')
  }

  return string + fill.join('')
}

function moldPops (pops) {
  while (pops[0].length < 8) {
    pops[0].unshift('−')
  }

  const firstPops = `（${toFullPitchCharacter(pops[0].slice(0, 4).join('／'))}）`
  const secondPops = `（${toFullPitchCharacter(pops[0].slice(-4).join('／'))}）`
  const thirdPops = `（${toFullPitchCharacter(pops[1].toString())}）`

  return [firstPops, secondPops, thirdPops]
}

function toFullPitchCharacter (str) {
  return str.replace(/[A-Za-z0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
  })
}

main()
