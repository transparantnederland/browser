export function pitToPath(pit) {
  return [
    pit.type === 'tnl:Person' ? '/person' : '/organization',
    pit.id.replace('urn:hgid:', ''),
  ].join('/');
}

export function personRelation(relation) {
  const relations = {
    'tnl:member': 'Member of',
    'tnl:boardmember': 'Boardmember of',
    'tnl:related': 'Related to',
  };

  return relations[relation] || '';
}

export function organizationRelation(relation) {
  const relations = {
    'tnl:member': 'Member',
    'tnl:boardmember': 'Boardmember',
    'tnl:related': 'Related',
  };

  return relations[relation] || '';
}
