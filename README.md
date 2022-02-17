# Everipedia UI

A wikipedia platform connected with web3. Main features are:

- data is stored using IPFS in a decentralized manner
- ipfs hashes are signed and pushed to the blockchain, that way there is a proof of events onchain
- an indexer listen to events on the blockchain, parses the ipfs hashes and store the data in a way that can be retrieved by frontend with a simple UI

## Diagram

![diagram1](https://user-images.githubusercontent.com/1288106/153891172-ca04c713-2ed6-4161-8bcc-001d5e83aef0.jpg)

## Services

- NextJS frontend under applications/frontend
- Graphql API using nestJS under applications/api
- Contracts using solidity & hardhat under applications/contracts

## For development

Here a list of handy information to develop using this repo.

### Develop

To develop all apps and packages (nextjs, hardhat blockchain, nestJS API), run the following command:

```bash
yarn dev
```

### Services

If you want to run services (postgresql, thegraph, ipfs):

```bash
yarn clean-services && yarn services
```

### Add dummy data to the graph

```bash
yarn services-post-test
```

### Build

To build all apps and packages, run the following command:

```bash
yarn build
```

### Workarounds

In order to run services you need to have installed docker in your computer.
Sometimes its needed to create a folder ipfs & folder postgres under packages/graph/data

## Contributing

We use a Kanban-style board. That's were we prioritize the work. [Go to Project Board](https://github.com/EveripediaNetwork/issues/projects).

Please report bugs big and small by [opening an issue](https://github.com/EveripediaNetwork/issues)

## Useful Links

- https://metamask.io/ <- wallet for login
- https://thegraph.com/docs/en/about/introduction/ <- our graphql decentralized implementation
- https://ipfs.io/#why <- data hosting

- https://chakra-ui.com/ <- ui lib
- https://redux-toolkit.js.org/ <- state managment
- https://vercel.com/ <- hosting
