import { Injectable } from '@nestjs/common';
import { env } from '../../env';
import * as needle from "needle";
// const needle = require('needle');

@Injectable()
export class TwitterStreamService {

  private rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
  private streamURL = 'https://api.twitter.com/2/tweets/search/stream';
  private token = env.TWITTER_TOKEN;
  private rules = [];

  getStream(username, keyword): string {
    this.run();
    // Edit rules as desired here below
    this.rules = [
      // { 'value': 'dog has:images -is:retweet', 'tag': 'dog pictures' },
      // { 'value': 'cat has:images -grumpy', 'tag': 'cat pictures' },
      // { "value": `from:${username}` },
      { "value": `from:${username} ${keyword}` },
      // { "value": `conversation_id:${tweetId}` }
    ]
    const dateNow = new Date();
    return dateNow.toTimeString();
  }

  async getAllRules() {
    console.log('getAllRules start');

    const response = await needle('get', this.rulesURL, {
      headers: {
        "authorization": `Bearer ${this.token}`
      }
    })

    console.log(response.body);
    if (response.statusCode !== 200) {
      throw new Error(response.body);
      return null;
    }

    console.log('getAllRules end');
    return (response.body);
  }

  async deleteAllRules(currentRules) {
    console.log('deleteAllRules start');

    if (!Array.isArray(currentRules.data)) {
      return null;
    }

    const ids = currentRules.data.map(rule => rule.id);
    console.log('ids', ids);


    const data = {
      "delete": {
        "ids": ids
      }
    }
    console.log('data', data);

    const response = await needle('post', this.rulesURL, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this.token}`
      }
    })
    console.log('delete rulles: response.statusCode');
    console.log(response.statusCode);

    if (response.statusCode !== 200) {
      throw new Error(response.body);
      return null;
    }
    console.log('response');
    console.log(response.body);

    console.log('deleteAllRules end');
    return (response.body);

  }

  async setRules() {
    console.log('setRules start');


    const data = {
      "add": this.rules
    }
    console.log('data');
    console.log(data);

    const response = await needle('post', this.rulesURL, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this.token}`
      }
    })
    console.log('set: response.statusCode');
    console.log(response.statusCode);

    if (response.statusCode !== 201) {
      throw new Error(response.body);
      return null;
    }
    console.log('response');
    console.log(response.body);

    console.log('setRules end');

    return (response.body);

  }

  streamConnect(token) {
    console.log('streamConnect start');

    //Listen to the stream
    const options = {
      timeout: 20000
    }

    const stream = needle.get(this.streamURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, options);

    stream.on('data', data => {
      try {
        console.log('on data 1');
        console.log('data recived: ');
        console.log(data.toJSON());
        console.log(data.toString());
        const json = JSON.parse(data);
        console.log('on data 2');
        console.log(json);
        console.log('on data 3');
      } catch (e) {
        console.log('in catch block');
        console.log(e);
        // Keep alive signal received. Do nothing.
      }
    }).on('error', error => {
      console.log('in error');
      console.log(error);

      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });

    console.log('streamConnect end');
    return stream;

  }


  async run() {
    let currentRules;

    try {
      // Gets the complete list of rules currently applied to the stream
      currentRules = await this.getAllRules();
      console.log('currentRules');
      console.log(currentRules);

      // Delete all rules. Comment the line below if you want to keep your existing rules.
      await this.deleteAllRules(currentRules);
      // Add rules to the stream. Comment the line below if you don't want to add new rules.
      await this.setRules();

    } catch (e) {
      console.error(e);
      process.exit(-1);
    }

    // Listen to the stream.
    // This reconnection logic will attempt to reconnect when a disconnection is detected.
    // To avoid rate limites, this logic implements exponential backoff, so the wait time
    // will increase if the client cannot reconnect to the stream.

    const filteredStream = this.streamConnect(this.token)
    let timeout = 0;
    console.log('typeof(filteredStream)');
    console.log(typeof(filteredStream));
    
    filteredStream.on('timeout', () => {
      // Reconnect on error
      console.warn('A connection error occurred. Reconnecting…');
      setTimeout(() => {
        timeout++;
        console.log('timeout: ', timeout);
        this.streamConnect(this.token);
      }, 2 ** timeout);
      this.streamConnect(this.token);
    })

  };

}
