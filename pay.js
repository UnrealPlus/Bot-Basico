module.exports = [{
  name: "pay",
  aliases: ["pagar"],
  usage: "!pay valor @user", //modo de uso do comando
  code: `
foi feita uma transferência de \`$get[moeda] moedas para <@!$findUser[$messageSlice[1;5]]>. espero que tenha feito bons negócios!
$reply
$setGlobalUserVar[money;$sub[$getGlobalUserVar[money;$authorID];$get[moeda];$authorID]
$setGlobalUserVar[money;$sum[$getGlobalUserVar[money;$findUser[$messageSlice[1;5]]];$get[moeda];$findUser[$messageSlice[1;5]]]
$onlyIf[$checkContains[$messageSlice[1;5];$toLowercase[inf];-;$toLowercase[nan]]==false;<:graveto:992963223164825631> » afinal, esses carctéres não sao números.]
$onlyIf[$get[moeda]>1;quantias de moedas só podem ser pagas a cima de \`1\`. tente 2 ou mais, por exemplo]
$onlyIf[$getGlobalUserVar[money;$authorID]>=$get[moeda];infelizmente você não tem esta quantia. consiga mais usando:
\`daily\`]
$onlyIf[$findUser[$messageSlice[1;5]]!=$authorID;eita, você + você ? o mesmo não pode se pagar]
$onlyIf[$findUser[$message[1]]!=$clientID;já estou vendo "$username[$authorID] queria doar para $username[$clientID] e, ela rejeitou". obrigada]
$onlyIf[$userExists[$findUser[$messageSlice[1;5]]]==true;não reconhci ninguém chamado \`$messageSlice[1;5]]
$let[moeda;$textTrim[$replaceText[$replaceText[$message[1];k;000];all;$getGlobalUserVar[money;$authorID]]]]
$onlyIf[$message[2]!=;ei, você está apressado ? está se esquecendo do @user.
consigo reconhecer \`nome/id/menção\`]
$onlyIf[$message[1]!=;você esqueceu-se de colocar alguma quantia, tente assim:
\`$getServerVar[prefix;$guildID]pay quantia @user\`]
`
}]
