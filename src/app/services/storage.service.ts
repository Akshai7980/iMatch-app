import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(public storage: Storage) { 
  //   this.items = [
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Liam',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Noah',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Logan',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'James',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Oliver',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Elijah',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Benjamin',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'William',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Lucas',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Regina',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Emma',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Ava',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Olivia',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Isabella',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Amelia',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Mia',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Evelyn',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Charlotte',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Sophia',
  //         add: '../../assets/icon/fans/add.png',
  //       },
  //       {
  //         image: '../../assets/icon/fans/1.jpg',
  //         name: 'Harper',
  //         add: '../../assets/icon/fans/add.png',
  //       } 
  //   ];
  }

  setStorage(key: string, value: any) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    await this.storage.get(key).then((val) => {
      console.log('Value From Storage:', val);
      return val;
    });
  }
  
  clearStorage() {
    this.storage.clear();
  }

}