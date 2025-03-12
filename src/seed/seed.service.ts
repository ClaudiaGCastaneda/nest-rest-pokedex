import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  
  
  constructor(
    @InjectModel (Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http:AxiosAdapter,
  ){}



  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

   
    //Esta implementación genera un nuevo insert para cada pokemon
    // const insertPromisesArray = data.results.map(({ name, url }) => {
    //   const segments = url.split('/');
    //   const no: number = +segments[segments.length - 2];

    //   // Retorna la promesa para crear el pokemon
    //   return this.pokemonModel.create({ name, no });
    // });

    // // Espera que todas las promesas se resuelvan
    // await Promise.all(insertPromisesArray);

    // return 'Seed executed';

    //la siguiente implementación realiza la carga en un solo query
    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({ name, url})=> {
       const segments = url.split('/');
       const no: number = +segments[segments.length - 2];
       
       pokemonToInsert.push({name, no});
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';

  }

}
