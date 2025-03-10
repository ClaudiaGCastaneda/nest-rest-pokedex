import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel (Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){}


  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      console.log('va a insertar');
      const pokemon = await this.pokemonModel.create( createPokemonDto )

      console.log({pokemon});
      return pokemon;
    } catch (error) {
      console.log(error);
      this.handleEsxceptions( error );

    }
    
    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;
    if(!isNaN (+term)){
      pokemon = await this.pokemonModel.findOne({no:term});

    }

    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById( term );
    }

    if (!pokemon){
      pokemon = await this.pokemonModel.findOne({name:term});
    }

    if(!pokemon){
      throw new NotFoundException (`Pokemon with id, name or no "${ term }" not found`);
    }



    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = this.findOne(term);

    if (updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
      const updatedPokemon = await (await pokemon).updateOne(updatePokemonDto, { new: true });
      return { ...(await pokemon).toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleEsxceptions(error);
    }

   

  }

  async remove(id: string) {

    // const pokemon = await this.findOne(id);

    // await pokemon.deleteOne();

   // const result = await this.pokemonModel.findByIdAndDelete(id);

   const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});

   if(deletedCount === 0 ){
      throw new BadRequestException (`Pokemon with "$ { id }" not found`);
      return;
   }

  }

  private handleEsxceptions (error:any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue)}`);
    }
    
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
