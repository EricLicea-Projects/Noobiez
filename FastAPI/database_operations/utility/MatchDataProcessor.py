class MatchDataProcessor:
    def __init__(self, json_data):
        self.json_data = json_data

    def extract_matches(self):
        return {
            'matchId': self.json_data['metadata']['matchId'],
            'queueId': self.json_data['info']['queueId'],
            'gameCreation': self.json_data['info']['gameCreation'],
            'gameEndTimestamp': self.json_data['info']['gameEndTimestamp'],
        }
    
    def extract_participants(self):
        participants = self.json_data['info']['participants']
        processed_participants = []
        for participant in participants:
            processed_participants.append({
                'matchId': self.json_data['metadata']['matchId'],
                'participantId': participant['participantId'],
                'puuid': participant['puuid'],
                'riotIdGameName': participant['riotIdGameName'],
                'assists': participant['assists'],
                'baronTakedowns': participant['challenges']['baronTakedowns'],
                'champLevel': participant['champLevel'],
                'championId': participant['championId'],
                'deaths': participant['deaths'],
                'goldEarned': participant['goldEarned'],
                'inhibitorTakedowns': participant['inhibitorTakedowns'],
                'item0': participant['item0'],
                'item1': participant['item1'],
                'item2': participant['item2'],
                'item3': participant['item3'],
                'item4': participant['item4'],
                'item5': participant['item5'],
                'item6': participant['item6'],
                'kills': participant['kills'],
                'magicDamageDealtToChampions': participant['magicDamageDealtToChampions'],
                'magicDamageTaken': participant['magicDamageTaken'],
                'defense': participant['perks']['statPerks']['defense'],
                'flex': participant['perks']['statPerks']['flex'],
                'offense': participant['perks']['statPerks']['offense'],
                'primaryPerk0': participant['perks']['styles'][0]['selections'][0]['perk'],
                'primaryPerk1': participant['perks']['styles'][0]['selections'][1]['perk'],
                'primaryPerk2': participant['perks']['styles'][0]['selections'][2]['perk'],
                'primaryPerk3': participant['perks']['styles'][0]['selections'][3]['perk'],
                'primaryStyle': participant['perks']['styles'][0]['style'],
                'subPerk0': participant['perks']['styles'][1]['selections'][0]['perk'],
                'subPerk1': participant['perks']['styles'][1]['selections'][1]['perk'],
                'subStyle': participant['perks']['styles'][1]['style'],
                'physicalDamageDealtToChampions': participant['physicalDamageDealtToChampions'],
                'physicalDamageTaken': participant['physicalDamageTaken'],
                'summoner1Id': participant['summoner1Id'],
                'summoner2Id': participant['summoner2Id'],
                'summonerId': participant['summonerId'],
                'summonerLevel': participant['summonerLevel'],
                'teamPosition': participant['teamPosition'],
                'teamId': participant['teamId'],
                'totalDamageDealtToChampions': participant['totalDamageDealtToChampions'],
                'totalDamageTaken': participant['totalDamageTaken'],
                'totalTimeSpentDead': participant['totalTimeSpentDead'],
                'trueDamageDealtToChampions': participant['trueDamageDealtToChampions'],
                'trueDamageTaken': participant['trueDamageTaken'],
                'turretTakedowns': participant['turretTakedowns'],
                'visionWardsBoughtInGame': participant['visionWardsBoughtInGame'],
                'wardsKilled': participant['wardsKilled'],
                'wardsPlaced': participant['wardsPlaced'],
                'neutralMinionsKilled': participant['neutralMinionsKilled'],
                'totalMinionsKilled': participant['totalMinionsKilled'],
                'largestMultiKill': participant['largestMultiKill'],
                'goldPerMinute': participant['challenges'].get('goldPerMinute', 0),
                'kda': participant['challenges'].get('kda', 0),
                'killParticipation': participant['challenges'].get('killParticipation', 0)
            })

        return processed_participants
        
    def extract_teams(self):
        teams = self.json_data['info']['teams']
        processed_teams = []
        for key in teams:
            bans = key['bans'] + [{'championId': -1}] * (5 - len(key['bans']))

            processed_teams.append({
                'teamId': key['teamId'],
                'matchId': self.json_data['metadata']['matchId'],
                'win': 1 if key['win'] else 0,
                'banOne': bans[0].get('championId', -1),
                'banTwo': bans[1].get('championId', -1),
                'banThree': bans[2].get('championId', -1),
                'banFour': bans[3].get('championId', -1),
                'banFive': bans[4].get('championId', -1),
                'baron': key['objectives']['baron']['kills'],
                'dragon': key['objectives']['dragon']['kills'],
                'inhibitor': key['objectives']['inhibitor']['kills'],
                'riftHerald': key['objectives']['riftHerald']['kills'],
                'tower': key['objectives']['tower']['kills']
            })

        return processed_teams
