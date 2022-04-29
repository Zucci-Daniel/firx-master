// const filterOutBlackList = async (postIDs, path = 'AllPosts', lastItem) => {
//   var batches = [];

//   while (postIDs.length) {
//     var batch = postIDs.splice(0, 10);

//     batches.push([...batch]);
//   }
//   // console.log(Promise.all(batches).then(content => content.flat()));
//   console.log(batches, ' bathces');
// };

///when calling

// filterOutBlackList([
//   'e53261c8-01aa-49fa-8377-fc938dbc87e3',
//   'd900b9a7-2eda-4f61-b4ec-f157e56321e3',
//   'e13bf805-e969-4015-97f6-42e90621a01f',
//   'b1cd52b4-4203-4ecb-aac8-9f7cb330fe4c',
//   '9c5d10b0-d987-461a-889e-5abf7ad3ebc4',
//   '81bcb8df-8f11-4809-8279-da1cabe27f12',
//   '5dccb663-684c-4035-82a7-69d75f1f3944',
//   '4ce3ed95-fb2e-4b1b-9004-1dcdce203855',
//   '293f8494-729b-4bad-8373-10e4137e1338',
// ]);
