<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'comment' => $this->faker->sentence(20),
            'rating' => $this->faker->numberBetween(1,5),
            'movieId' => $this->faker-> numberBetween(550000, 66000),
            'user_id' => $this->faker->numberBetween(9125,9125),
            'media_type' => 'movie'
        ];
    }
}
