migrate((db) => {
  const collection = new Collection({
    "id": "s09sn1iigrrnyex",
    "created": "2022-12-21 04:19:17.872Z",
    "updated": "2022-12-21 04:19:17.872Z",
    "name": "sites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vxmhpwrr",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": 3,
          "max": 20,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zxrgwzu0",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 5,
          "max": 60,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "dlfbasok",
        "name": "purposes",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 3,
          "values": [
            "gallery",
            "resource",
            "tool",
            "blog",
            "education",
            "game",
            "community",
            "unknown"
          ]
        }
      },
      {
        "system": false,
        "id": "vypod4ew",
        "name": "url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "bn0oq9tk",
        "name": "topics",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 3,
          "values": [
            "graphic",
            "design",
            "programming",
            "science",
            "audio",
            "culture",
            "linguistic",
            "cookery",
            "math",
            "game",
            "other"
          ]
        }
      },
      {
        "system": false,
        "id": "heku71uf",
        "name": "accessibility",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "full",
            "membership",
            "shop",
            "subscription",
            "unknown"
          ]
        }
      },
      {
        "system": false,
        "id": "9ssje4l1",
        "name": "thumbnail",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif"
          ],
          "thumbs": [
            "300x300"
          ]
        }
      },
      {
        "system": false,
        "id": "nr410mq3",
        "name": "warnings",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 3,
          "values": [
            "flashing",
            "caution",
            "unsettling"
          ]
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s09sn1iigrrnyex");

  return dao.deleteCollection(collection);
})
