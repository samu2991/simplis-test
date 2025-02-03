<?php

namespace App\Entity;

use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 200)]
    private ?string $name = null;

    #[ORM\Column(enumType: EnumCompanyLegalForm::class)]
    private ?EnumCompanyLegalForm $legalForm = null;

    #[ORM\Column(nullable: true)]
    private ?int $projectedTurnover = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $siret = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $creationDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $postalAddress = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $postalAddressComplement = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $postalAddressZipCode = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $postalAddressCity = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $postalAddressCountry = null;

    /**
     * @var Collection<int, Customer>
     */
    #[ORM\OneToMany(targetEntity: Customer::class, mappedBy: 'company', orphanRemoval: true)]
    private Collection $customers;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->customers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLegalForm(): ?EnumCompanyLegalForm
    {
        return $this->legalForm;
    }

    public function setLegalForm(EnumCompanyLegalForm $legalForm): static
    {
        $this->legalForm = $legalForm;

        return $this;
    }

    public function getProjectedTurnover(): ?int
    {
        return $this->projectedTurnover;
    }

    public function setProjectedTurnover(?int $projectedTurnover): static
    {
        $this->projectedTurnover = $projectedTurnover;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): static
    {
        $this->siret = $siret;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(?\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getPostalAddress(): ?string
    {
        return $this->postalAddress;
    }

    public function setPostalAddress(?string $postalAddress): static
    {
        $this->postalAddress = $postalAddress;

        return $this;
    }

    public function getPostalAddressComplement(): ?string
    {
        return $this->postalAddressComplement;
    }

    public function setPostalAddressComplement(?string $postalAddressComplement): static
    {
        $this->postalAddressComplement = $postalAddressComplement;

        return $this;
    }

    public function getPostalAddressZipCode(): ?string
    {
        return $this->postalAddressZipCode;
    }

    public function setPostalAddressZipCode(?string $postalAddressZipCode): static
    {
        $this->postalAddressZipCode = $postalAddressZipCode;

        return $this;
    }

    public function getPostalAddressCity(): ?string
    {
        return $this->postalAddressCity;
    }

    public function setPostalAddressCity(?string $postalAddressCity): static
    {
        $this->postalAddressCity = $postalAddressCity;

        return $this;
    }

    public function getPostalAddressCountry(): ?string
    {
        return $this->postalAddressCountry;
    }

    public function setPostalAddressCountry(?string $postalAddressCountry): static
    {
        $this->postalAddressCountry = $postalAddressCountry;

        return $this;
    }

    /**
     * @return Collection<int, Customer>
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): static
    {
        if (!$this->customers->contains($customer)) {
            $this->customers->add($customer);
            $customer->setCompany($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): static
    {
        if ($this->customers->removeElement($customer)) {
            // set the owning side to null (unless already changed)
            if ($customer->getCompany() === $this) {
                $customer->setCompany(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
