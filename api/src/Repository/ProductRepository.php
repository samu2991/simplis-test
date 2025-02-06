<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * Find products matching the given criteria
     */
    public function findMatchingProducts(array $criteria): array
    {
        $qb = $this->createQueryBuilder('p')
            ->where('p.businessLocation = :businessLocation')
            ->andWhere('p.maxProjectedTurnover >= :maxProjectedTurnover')
            ->setParameter('businessLocation', $criteria['businessLocation'])
            ->setParameter('maxProjectedTurnover', $criteria['maxProjectedTurnover']);

        return $qb->getQuery()->getResult();
    }
}
