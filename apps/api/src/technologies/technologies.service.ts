import { Injectable } from '@nestjs/common';
import { Technology } from './dto/technology';
import { Ring } from './dto/ring';
import { Category } from './dto/category';
import { randomUUID } from 'crypto';

@Injectable()
export class TechnologiesService {
  getTechnologies(): Technology[] {
    return [
      new Technology(
        randomUUID(),
        'Tech A',
        'Description of tech a',
        Ring.Assess,
        Category.languagesAndFrameworks,
      ),
    ];
  }
  getTechnologyByUuid(uuid: string): Technology {
    return new Technology(
      uuid,
      'Tech A',
      'Description of tech a',
      Ring.Assess,
      Category.languagesAndFrameworks,
    );
  }
}
