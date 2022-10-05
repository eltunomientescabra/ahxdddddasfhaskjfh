const Discord = require('discord.js'); //Definimos discord
const { Client, Intents, MessageEmbed, Collection, Guild } = require('discord.js');
const intents = new Discord.Intents(14023)
const client = new Discord.Client({ intents })
const fs = require('fs'); //Definimos fs
let { readdirSync } = require('fs'); //Definimos readdirSync que también lo necesitamos

////////////////////////HANDLER//////////////////////////
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

client.on('ready', () => {
	console.log('Bot encendido! ' + client.user.tag);
});

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

//Eventos
for(const file of readdirSync('./eventos/')) { //Los eventos de carga para el bot
  if(file.endsWith(".js")){
  let fileName = file.substring(0, file.length - 3); 
  let fileContents = require(`./eventos/${file}`); 
  client.on(fileName, fileContents.bind(null, client));}}
  
client.on('messageCreate', (message) => {

let prefix = 'momo!'

if(message.channel.type === "dm") 
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)
}
  
    });

    const { WelcomeCard } = require('naotori'), { MessageAttachment } = require('discord.js')

client.on('guildMemberAdd', async (member) => {
    let wlcCarc = new WelcomeCard()
    .setBackground('http://images3.memedroid.com/images/UPLOADED271/5f98621b1e81e.jpeg')
    .setMemberIcon(member.user.displayAvatarURL({ format: 'png', size: 2048 }))
    .setTitle(`Bienvenido ${member.user.username}`)
    .setDescription('Pasatela bien en este server!')
    .setCircleColor('#FFFFFF')
    .setFont('default')

    const card = await wlcCarc.render()
    const welcome = new MessageAttachment(card, 'welcome.png')
    client.channels.cache.get('1017072820104216643').send({ files: [welcome], content: `**Hola ${member}!** recuerda pasartela bien,\n **lee las <#> y diviertete!**` })
})

client.login("MAAFAJSJFAKSJFHAJSFHJASJKFJH");