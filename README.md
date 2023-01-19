# IQ.wiki UI

A wikipedia platform connected with web3. Main features are:

- data is stored using IPFS in a decentralized manner
- ipfs hashes are signed and pushed to the blockchain, that way there is a proof of events onchain
- an indexer listen to events on the blockchain, parses the ipfs hashes and stores the data in a way that can be retrieved by frontend with a simple UI

## Diagram

![diagram1](https://user-images.githubusercontent.com/1288106/153891172-ca04c713-2ed6-4161-8bcc-001d5e83aef0.jpg)

## Services

- NextJS frontend under applications/frontend
- Graphql API using nestJS under applications/api
- Contracts using solidity & hardhat under applications/contracts

## For development

Here is a list of handy information to develop using this repo.

### Develop

To develop in local, run the following command:

```bash
yarn dev
```

### Prepare (Husky)

First time you install the repo make sure you run the following command to use our git hooks:

```bash
yarn prepare
```

### Build

To build run the following command:

```bash
yarn build
```

## Contributing

We use a Kanban-style board. That's where we prioritize the work. [Go to Project Board](https://github.com/EveripediaNetwork/issues/projects).

Please report bugs big and small by [opening an issue](https://github.com/EveripediaNetwork/issues)

## Useful Links

- https://metamask.io/ <- wallet for login
- https://ipfs.io/#why <- data hosting

- https://chakra-ui.com/ <- ui lib
- https://redux-toolkit.js.org/ <- state management
- https://vercel.com/ <- hosting
