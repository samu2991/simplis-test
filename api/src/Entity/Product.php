<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'Products')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'product_id')]
    private ?int $id = null;

    #[ORM\Column(length: 100, nullable: true, name: 'product_name')]
    private ?string $name = null;

    #[ORM\Column(type: 'float', nullable: true)]
    private ?float $price = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $insurer = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $eligibleLegalForm = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $businessLocation = null;

    #[ORM\Column(type: 'decimal', precision: 15, scale: 2, nullable: true)]
    private ?string $maxProjectedTurnover = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): static
    {
        $this->price = $price;
        return $this;
    }

    public function getInsurer(): ?string
    {
        return $this->insurer;
    }

    public function setInsurer(?string $insurer): static
    {
        $this->insurer = $insurer;
        return $this;
    }

    public function getEligibleLegalForm(): ?string
    {
        return $this->eligibleLegalForm;
    }

    public function setEligibleLegalForm(?string $eligibleLegalForm): static
    {
        $this->eligibleLegalForm = $eligibleLegalForm;
        return $this;
    }

    public function getBusinessLocation(): ?string
    {
        return $this->businessLocation;
    }

    public function setBusinessLocation(?string $businessLocation): static
    {
        $this->businessLocation = $businessLocation;
        return $this;
    }

    public function getMaxProjectedTurnover(): ?string
    {
        return $this->maxProjectedTurnover;
    }

    public function setMaxProjectedTurnover(?string $maxProjectedTurnover): static
    {
        $this->maxProjectedTurnover = $maxProjectedTurnover;
        return $this;
    }
}
